"use client"

import { useRouter } from "next/navigation"

import { useLayoutEffect, useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  CalendarIcon,
  LineChart,
  MoreVertical,
  Plus,
  Syringe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination"
import { Header } from "../../components/header/button"

export default function Page() {
  const router = useRouter()
  const [pets, setPets] = useState<any[]>([])

  useLayoutEffect(() => {
    setPets(() => {
      const storedPets = localStorage?.getItem("pets") ?? "[]"
      return JSON.parse(storedPets)
    })
  }, [])

  const handlePetDelete = (id: string) => {
    const storedPets = localStorage?.getItem("pets") ?? "[]"
    const pets = JSON.parse(storedPets)
    //@ts-expect-error
    const newPets = pets.filter((pet) => pet.id !== id)
    localStorage?.setItem("pets", JSON.stringify(newPets))
    setPets(newPets)

    const storedHistory = localStorage?.getItem("history") ?? "[]"
    const history = JSON.parse(storedHistory)
    //@ts-expect-error
    const newHistory = history.filter((item) => item.petId !== id)
    localStorage?.setItem("history", JSON.stringify(newHistory))
  }

  return (
    <>
      <Header />
      <main className="flex flex-col gap-6 p-8">
        <div>
          <h1 className="w-full text-3xl font-semibold">Meus Pets</h1>
          {!pets.length ? (
            <div className="leading-none">
              <span className="w-full text-sm text-muted-foreground">
                Você ainda não tem nenhum pet.
              </span>
              <Button
                onClick={() => {
                  router.push("/pets/create")
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
              Você tem {pets.length} pet(s).
            </span>
          )}
        </div>
        {pets.length > 0 && (
          <Button type="button" onClick={() => router.push(`/pets/create`)}>
            Adicionar novo pet
            <Plus className="size-4 ml-2" />
          </Button>
        )}
        {pets.map((pet, index) => (
          <>
            <div className="p-4 border-4 border-gray-300 rounded-sm">
              <Card key={pet.id} className="overflow-hidden w-full h-fit" onClick={() => {router.push(`/pets/${pet.id}`)}}>
                <CardHeader className="w-full ">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      <Image
                        src="/images/others/cachorro-caramelo.jpg"
                        alt="iamge do pet"
                        width={100}
                        height={100}
                      />
                      <div className="flex flex-col justify-between">
                        <CardTitle className="line-clamp-2 break-words hyphens-auto ">
                          {pet.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-3 break-words hyphens-auto">
                          {pet.breed} - {pet.color}
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
                            router.push(`/pets/${pet.id}`)
                          }}
                        >
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            handlePetDelete(pet.id)
                          }}
                        >
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
              </Card>
              <Pagination className="mt-4">
                <PaginationPrevious />
                <PaginationNext />
              </Pagination>
            </div>
          </>
        ))}
        <div>
          <p className="font-bold">Em desenvolvimento</p>
          <div className="flex gap-4">
            <Button disabled>
              <LineChart />
              Dashboard
            </Button>
            <Button disabled>
              <CalendarIcon />
              Agenda
            </Button>
            <Button disabled>
              <Syringe />
              Vacina
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
