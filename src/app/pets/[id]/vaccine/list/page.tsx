"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu"
import { MoreVertical, Plus, Syringe } from "lucide-react"
import { FaEye, FaTrash } from "react-icons/fa6"
import { Header } from "../../../../../components/header/button"
import { Button } from "../../../../../components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useLayoutEffect, useState } from "react"

interface PageProps {
  params: {
    id: string
  }
}

export default function Page({ params }: PageProps) {
  const router = useRouter()
  const [vaccines, setVaccines] = useState<any[]>([])

  useLayoutEffect(() => {
    setVaccines(() => {
      const storedVaccines = localStorage?.getItem("vaccines") ?? "[]"
      return JSON.parse(storedVaccines)
    })
  }, [])

  return (
    <>
      <Header />
      <main className="flex flex-col gap-6 p-8">
        <div>
          <h1 className="w-full text-3xl font-semibold">Minhas Vacinas</h1>
          {!vaccines.length ? (
            <div className="leading-none">
              <span className="w-full text-sm text-muted-foreground">
                Seu pet ainda não tem nenhuma vacina
              </span>
              <Button
                onClick={() => {
                  router.push(`/pets/${params.id}/vaccine/create`)
                }}
                className="text-slate-800 p-0 px-1 h-fit"
                variant={"link"}
              >
                Clique aqui
              </Button>
              <span className="w-full text-sm text-muted-foreground">
                para cadastrar!
              </span>
            </div>
          ) : (
            <span className="w-full text-sm text-muted-foreground">
              Seu pet não tem {vaccines.length} vacina(s).
            </span>
          )}
        </div>
        {vaccines.length > 0 && (
          <Button type="button" onClick={() => router.push(`/pets/${params.id}/vaccine/create`)}>
            Cadastrar novo pet
            <Plus className="size-4 ml-2" />
          </Button>
        )}
        {/* {vaccines.map((vaccine, index) => {
          <>
          </>
        })} */}
        <div className="p-4 border-2 border-gray-200 rounded-sm flex flex-col gap-4">
          <Card
            // key={pet.id}
            className="overflow-hidden w-full h-fit cursor-pointer"
            onClick={() => {
              // router.push(`/pets/${pet.id}`)
            }}
          >
            <CardHeader className="w-full ">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center w-full">
                  <div className="overflow-hidden">
                    <Syringe className="size-10" />
                  </div>
                  <div className="flex flex-col  space-y-3">
                    <CardTitle className="line-clamp-2 break-words hyphens-auto mt-4">
                      {/* {pet.name} */}
                      Nome da vacina
                    </CardTitle>
                    <CardDescription className="line-clamp-3 break-words ">
                      {/* {pet.breed} - {pet.color} */}
                      Data da vacina - Data da próxima vacina
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-fit h-fit">
                    <MoreVertical className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="left">
                    <DropdownMenuItem
                      onClick={() => {
                        // router.push(`/pets/${pet.id}`)
                      }}
                    >
                      <FaEye className="mr-2" />
                      Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        // handlePetDelete(pet.id)
                      }}
                    >
                      <FaTrash className="mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
          </Card>
        </div>
      </main>
    </>
  )
}
