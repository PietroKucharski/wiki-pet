"use client"

import React, { useMemo, useState } from "react"
import defaultImage from "../../../assets/images/catdog.png"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronLeft, Edit, MoreVertical, Plus } from "lucide-react"
import { renamePetObjectKey } from "@/lib/pets"
import { Header } from "../../../components/header/button"
interface PageProps {
  params: {
    id: string
  }
}

export default function Page({ params }: PageProps) {
  const [pet, setPet] = useState<any>(() => {
    const storedPets = localStorage?.getItem("pets") ?? "[]"
    const pets = JSON.parse(storedPets)
    // TODO: Create this type
    //@ts-expect-error
    return pets.find((pet) => pet.id === params.id)
  })

  const [history, setHistory] = useState<any[]>(() => {
    const history = localStorage?.getItem("history") ?? "[]"
    const parsedHistory = JSON.parse(history)
    // TODO: Create this type
    //@ts-expect-error
    return parsedHistory.filter((item) => params.id === item.petId)
  })

  function handleDeleteHistory(id: string) {
    const history = localStorage?.getItem("history") ?? "[]"
    const parsedHistory = JSON.parse(history)
    //@ts-expect-error
    const newHistory = parsedHistory.filter((item) => item.id !== id)
    localStorage?.setItem("history", JSON.stringify(newHistory))
    setHistory(newHistory)
  }

  const router = useRouter()

  return (
    <>
      <Header />
      <div className="flex justify-between items-center px-6 my-4">
        <Button
          className="p-0 h-fit w-fit text-black"
          variant={"link"}
          type="button"
          onClick={() => router.push(`/pets`)}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          className="p-0 h-fit w-fit text-black"
          variant={"ghost"}
          type="button"
          onClick={() => router.push(`/pets/${params.id}/edit`)}
        >
          <Edit className="size-4" />
        </Button>
      </div>
      <div className="px-8 flex flex-col gap-4 relative">
        <div className="flex justify-center">
          <h1 className="font-bold text-xl">Perfil do pet 🐶😺</h1>
        </div>
        <div className="flex justify-center">
          <Image
            className="w-24 h-24 rounded-full select-none"
            src={pet.image || defaultImage}
            alt={pet.name}
            width={150}
            height={150}
          />
        </div>
        <div className="text-center font-bold text-xl">{pet.name}</div>
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="w-full bg-primary">
            <TabsTrigger className={"w-full"} value="about" defaultChecked>
              Sobre
            </TabsTrigger>
            <TabsTrigger className={"w-full"} value="history">
              Histórico
            </TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="flex flex-col gap-4">
            {Object.keys(pet).map((key, index) => {
              if (key === "id" || key === "name") return null
              return (
                <div key={index} className="flex gap-1 leading-none">
                  <div className="font-semibold">
                    {renamePetObjectKey(key)}:
                  </div>
                  <div className="pl-1">
                    {key === "gender"
                      ? pet[key]
                        ? "Macho"
                        : "Fêmea"
                      : typeof pet[key] === "boolean"
                      ? pet[key]
                        ? "Sim"
                        : "Não"
                      : pet[key]}
                  </div>
                </div>
              )
            })}
          </TabsContent>

          <TabsContent value="history" className="gap-4 flex flex-col">
            {!!history.length ? (
              <>
                <Button
                  className="p-0 h-fit w-fit text-black self-end"
                  variant={"link"}
                  type="button"
                  onClick={() =>
                    router.push(`/pets/${params.id}/history/create`)
                  }
                >
                  <Plus className="size-4" /> Adicionar novo histórico
                </Button>
                {history.map((item, index) => (
                  <Card key={item.id} className="overflow-hidden w-full ">
                    <CardHeader className="w-full ">
                      <div className="flex justify-between">
                        <CardTitle className="line-clamp-2 break-words hyphens-auto ">
                          {item.title}
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="w-fit h-fit">
                            <MoreVertical className="size-5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="left">
                            <DropdownMenuItem
                              onClick={() => {
                                router.push(
                                  `/pets/${params.id}/history/${item.id}/edit`
                                )
                              }}
                            >
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled>Visualizar(<b>Em desenvolvimento</b>)</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                handleDeleteHistory(item.id)
                              }}
                            >
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      {!!item?.description && (
                        <CardDescription className="line-clamp-3 break-words hyphens-auto">
                          {item.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    {/* <CardContent className='grid gap-4'>
                </CardContent> */}
                    <CardFooter>
                      <div className="text-xs text-muted-foreground flex gap-1 justify-between w-full">
                        <span>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(Number(item.expenses))}
                        </span>
                        <span>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </>
            ) : (
              <div className="text-center rounded-md bg-slate-50 py-4 px-2 text-muted-foreground">
                <div>Nenhum historico encontrado!</div>
                <Button
                  className="p-0 h-fit w-fit text-black"
                  variant={"link"}
                  type="button"
                  onClick={() =>
                    router.push(`/pets/${params.id}/history/create`)
                  }
                >
                  Crie um aqui!
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
