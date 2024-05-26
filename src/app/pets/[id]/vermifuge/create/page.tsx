"use client"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {zodResolver} from "@hookform/resolvers/zod"
import {create} from "domain"
import {ChevronLeft, Edit} from "lucide-react"
import {useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import {date, z} from "zod"
import {Header} from "../../../../../components/header/button"
import React from "react";

interface PageProps {
    params: {
        id: string
    }
}

const formSchema = z.object({
    date: z.string({required_error: "Date is required"}),
    title: z.string({required_error: "Title is required"}).min(3),
    description: z.string().optional(),
    batch: z.string().optional(),
    returnDate: z.string().optional(),
    weight: z.string({required_error: "Weight is required"}),
    dose: z.string({required_error: "Dose is required"}),
    petId: z.string(),
    id: z.string(),
    createdAt: z.string(),
})

export default function Page({params}: PageProps) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            petId: params.id ?? "",
            createdAt: new Date().toISOString(),
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            title: "",
            description: "",
            batch: "",
            returnDate: "",
            weight: "",
            dose: "",
        },
    })

    const router = useRouter()

    return (
        <>
            <Header/>
            <div className="px-4">
                <div className="flex justify-between items-center px-6 my-4 h-full">
                    <Button
                        className="p-0 h-fit w-fit text-black"
                        variant={"link"}
                        type="button"
                        onClick={() => router.push(`/pets/${params.id}`)}
                    >
                        <ChevronLeft className="size-4"/>
                    </Button>
                </div>
                <div className="flex justify-center">
                    <h1 className="font-bold text-xl mb-4">
                        Cadastrar Vermífugo 🗒️
                    </h1>
                </div>
                <div className="p-4 flex flex-col gap-3 border-2 border-gray-200 rounded-md ">
                    <div className="px-4">
                        <Form {...form}>
                            <form
                                className="flex flex-col gap-4"
                                onSubmit={form.handleSubmit((data) => {
                                    const storedHistoriesAsString =
                                        localStorage?.getItem("history") ?? "[]"
                                    const storedHistories = JSON.parse(storedHistoriesAsString)
                                    const updatedHistories = [...storedHistories, data]
                                    localStorage?.setItem("history", JSON.stringify(updatedHistories))
                                    router.push(`/pets/${params.id}?tab=history`)
                                })}
                            >
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Data</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="date"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Nome"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <textarea
                                    {...form.register("description")}
                                    rows={3}
                                    placeholder="Descrição"
                                    className="border border-gray-300 rounded-md p-2 max-h-40 min-h-11"
                                />
                                <FormField
                                    control={form.control}
                                    name="weight"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Peso</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="number" placeholder="Peso"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dose"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Dose</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Dose"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="returnDate"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Data da próxima dose</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="date"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <button
                                    type="submit"
                                    className="bg-primary p-2 rounded-md"
                                >
                                    Criar Vermífugo
                                </button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}