"use client"

import { signIn } from "@/api/sign-in"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const createAccountFormValidation = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  role: z.string(),
})

type CreateAccountFormData = z.infer<typeof createAccountFormValidation>

export default function CreateAccountForm() {
  const router = useRouter()
  const { mutateAsync: createAccount } = useMutation({
    mutationFn: signIn,
  })

  async function handleCreateAccount(data: CreateAccountFormData) {
    try {
      await createAccount({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      })
      toast.success("Conta cadastrada com sucesso")

      await router.push("/cadastro/conta/entrar")
    } catch (error) {
      toast.error("Credenciais inválidas!")
    }
  }

  const form = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountFormValidation),
    defaultValues: {
      role: "COMMON",
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = form

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="flex flex-col z-10 w-full max-w-5xl items-center justify-center text-sm">
        <Image
          alt="Logo"
          src="/images/logos/logo.png"
          sizes="100vw"
          className="w-[140px] h-auto mb-8"
          width={500}
          height={300}
        />
        <h1 className="font-bold text-xl mb-4">Cadastrar uma conta</h1>

        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(handleCreateAccount)}
              className="flex flex-col gap-3 w-full max-w-sm"
            >
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="E-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel"  placeholder="E-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} className="mt-4">
                {isSubmitting ? "Enviando…" : "Enviar"}
              </Button>
            </form>
          </Form>
        </FormProvider>
      </div>
    </main>
  )
}
