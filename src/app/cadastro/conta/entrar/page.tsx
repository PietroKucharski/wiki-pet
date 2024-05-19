"use client";

import { signUp } from "@/api/sign-up";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signUpFormValidation = z.object({
  email: z.string(),
  password: z.string(),
});

type SignUpFormData = z.infer<typeof signUpFormValidation>;

export default function SignUpForm() {
  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signUp,
  });

  async function handleSignUp(data: SignUpFormData) {
    try {
      await authenticate({
        email: data.email,
        password: data.password,
      });
      toast.success("Autenticação realizada com sucesso");
    } catch (error) {
      toast.error("Credenciais inválidas!");
    }
  }

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormValidation),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = form;

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
        <h1 className="font-bold text-xl mb-4">Acessar sua conta</h1>

        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="flex flex-col gap-3 w-full max-w-sm"
            >
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
                {isSubmitting ? "Autenticando…" : "Entrar"}
              </Button>
            </form>
          </Form>
        </FormProvider>
      </div>
    </main>
  );
}
