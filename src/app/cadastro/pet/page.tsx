"use client";

import { createPet } from "@/api/create-pet";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createPetFormValidation = z.object({
  name: z.string(),
  petType: z.string(),
  customPetType: z.string().optional(),
  age: z.number(),
  weight: z.number(),
  color: z.string(),
  breed: z.string(),
  neutered: z.boolean(),
  vaccines: z.array(z.string()),
});

type CreatePetFormData = z.infer<typeof createPetFormValidation>;

export default function CreatePetForm() {
  const router = useRouter();
  const { mutateAsync: createPetMutation } = useMutation({
    mutationFn: createPet,
  });

  async function handleCreatePet(data: CreatePetFormData) {
    try {
      await createPetMutation({
        userId: "2093u12eu21je128ej1298eh",
        name: data.name,
        petType: data.petType === "Outro" ? data.customPetType! : data.petType,
        age: data.age,
        weight: data.weight,
        color: data.color,
        breed: data.breed,
        neutered: data.neutered,
        vaccines: data.vaccines,
      });
      toast.success("Pet cadastrado com sucesso");

      // router.push("/cadastro/conta/entrar");
    } catch (error) {
      toast.error("Erro no cadastro");
    }
  }

  const form = useForm<CreatePetFormData>({
    resolver: zodResolver(createPetFormValidation),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    watch,
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
        <h1 className="font-bold text-xl mb-4">Cadastrar seu pet 🐶</h1>

        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(handleCreatePet)}
              className="flex flex-col gap-3 w-full max-w-sm"
            >
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Qual o nome do seu bichinho?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="petType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de animal</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo do seu animal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Cachorro">Cachorro</SelectItem>
                        <SelectItem value="Gato">Gato</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watch("petType") === "Outro" ? (
                <FormField
                  control={control}
                  name="customPetType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Informe o tipo do seu animal</FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder="Exemplo: Cavalo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}
              <FormField
                control={control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idade</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Exemplo: 2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Exemplo: 4.5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor</FormLabel>
                    <FormControl>
                      <Input placeholder="Preto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="breed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raça</FormLabel>
                    <FormControl>
                      <Input placeholder="Pitbull" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} className="mt-4">
                {isSubmitting ? "Cadastrando…" : "Cadastrar"}
              </Button>
            </form>
          </Form>
        </FormProvider>
      </div>
    </main>
  );
}
