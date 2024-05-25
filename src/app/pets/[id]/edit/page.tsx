'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Textarea } from '../../../../components/ui/textarea';
import { Checkbox } from '../../../../components/ui/checkbox';
import { Switch } from '../../../../components/ui/switch';
import { Label } from '../../../../components/ui/label';
import { PerfilImagePet } from '@/components/perfilIamgePet/perfilImagePet';

const createPetFormValidation = z.object({
  id: z.string(),
  name: z.string(),
  petType: z.string(),
  customPetType: z.string().optional(),
  age: z.string(),
  weight: z.string(),
  color: z.string(),
  breed: z.string(),
  peculiarities: z.string(),
  microchip: z.string(),
  neutered: z.boolean(),
});

type CreatePetFormData = z.infer<typeof createPetFormValidation>;

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditPetPage() {
  const router = useRouter();
  const params = useParams();
  console.log('>>>  ~ CreatePetForm ~ params:', params);
  const [avatar, setAvatar] = useState<File | null>(null);

  const { mutateAsync: createPetMutation } = useMutation({
    mutationFn: async (formData: FormData) => {
      console.log('Dados do formulário antes de enviar:', formData); // Console log
      const response = await axios.post(
        `${process.env.REACT_APP_WIKIPET_API_URL}/pet/create`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return response.data;
    },
  });

  async function handleCreatePet(data: CreatePetFormData) {
    // const formData = new FormData();
    // formData.append(
    //   'request',
    //   new Blob(
    //     [
    //       JSON.stringify({
    //         userId: '2093u12eu21je128ej1298eh',
    //         id: crypto.randomUUID(),
    //         name: data.name,
    //         petType:
    //           data.petType === 'Outro' ? data.customPetType! : data.petType,
    //         customPetType: pet?.petType ? pet?.petType : '',
    //         age: data.age,
    //         weight: parseFloat(data.weight), // Ensure weight is a number
    //         color: data.color,
    //         breed: data.breed,
    //         peculiarities: data.peculiarities,
    //         microchip: data.microchip,
    //         neutered: data.neutered,
    //       }),
    //     ],
    //     { type: 'application/json' }
    //   )
    // );

    // if (avatar) {
    //   formData.append('image', avatar);
    // }

    try {
      const allPets = localStorage?.getItem('pets') ?? '[]';
      const allPetsArray: any[] = JSON.parse(allPets);
      let currentPet = allPetsArray.findIndex((pet) => pet.id === params.id);
      if (currentPet === -1) {
        alert('Pet não encontrado');
        return;
      }
      allPetsArray[currentPet] = {
        ...allPetsArray[currentPet],
        ...data,
      };
      //TODO: Fix this type
      localStorage?.setItem('pets', JSON.stringify([...allPetsArray]));
      toast.success('Pet atualizado com sucesso');
      router.push(`/pets/${params.id}`);
    } catch (error) {
      toast.error('Erro no cadastro');
    }
  }

  const [pet, setPet] = useState(() => {
    const storedPets = localStorage?.getItem('pets') ?? '[]';
    const pets = JSON.parse(storedPets);
    //@ts-expect-error
    return pets.find((pet) => pet.id === params.id);
  });

  const form = useForm<CreatePetFormData>({
    resolver: zodResolver(createPetFormValidation),
    defaultValues: {
      id: pet?.id,
      name: pet?.name,
      petType: pet?.petType,
      customPetType:
        pet?.petType === 'Outro' ? pet?.customPetType : pet?.petType,
      age: pet?.age,
      weight: pet?.weight,
      color: pet?.color,
      breed: pet?.breed,
      peculiarities: pet?.peculiarities,
      microchip: pet?.microchip,
      neutered: pet?.neutered,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    watch,
  } = form;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  if (!pet) {
    return (
      <main className='flex flex-col gap-6 p-8'>
        <div>
          <h1 className='w-full text-3xl font-semibold'>Pet não encontrado</h1>
          <Button
            onClick={() => {
              router.push('/pets');
            }}
            className='text-slate-800 p-0 px-1 h-fit'
            variant={'link'}
          >
            Click here
          </Button>
          <span className='w-full text-sm text-muted-foreground'>
            to return to the list of your pets
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-8'>
      <div className='flex justify-start self-start items-center'>
        <Button
          className='p-0 h-fit w-fit text-black'
          variant={'link'}
          type='button'
          onClick={() => router.push(`/pets/${params.id}`)}
        >
          <ChevronLeft className='size-4' /> Voltar ao pet
        </Button>
      </div>
      <div className='flex flex-col gap-4 z-10 w-full max-w-5xl items-center justify-center text-sm'>
        <h1 className='font-bold text-xl'>Editar seu pet 🐶😺</h1>
        <div className='flex flex-col items-center'>
          <div className='gap-2 flex flex-col items-center'>
            <span className='inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100'>
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={URL.createObjectURL(avatar)}
                  alt='Avatar'
                  className='h-full w-full object-cover'
                />
              ) : (
                <Avatar className='h-full w-full' />
              )}
            </span>
            <div className='mt-2 flex space-x-2'>
              <div className='relative'>
                <Input
                  type='file'
                  accept='image/*'
                  onChange={handleImageUpload}
                  className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                />
                <button
                  type='button'
                  className='px-4 py-2 bg-blue-500 text-white rounded'
                >
                  Choose Image
                </button>
              </div>
              {avatar && (
                <button
                  onClick={() => setAvatar(null)}
                  className='px-4 py-2 bg-red-500 text-white rounded'
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>
        </div>
        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(handleCreatePet)}
              className='flex flex-col gap-3 w-full max-w-sm'
            >
              <FormField
                control={control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Qual o nome do seu bichinho?'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='petType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de animal</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecione o tipo do seu animal' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Cachorro'>Cachorro</SelectItem>
                        <SelectItem value='Gato'>Gato</SelectItem>
                        <SelectItem value='Outro'>Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {watch('petType') === 'Outro' ? (
                <FormField
                  control={control}
                  name='customPetType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Informe o tipo do seu animal</FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder='Exemplo: Cavalo'
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
                name='age'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idade</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Exemplo: 2' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='weight'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Exemplo: 4.5'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='color'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor</FormLabel>
                    <FormControl>
                      <Input placeholder='Preto' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='breed'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raça</FormLabel>
                    <FormControl>
                      <Input placeholder='Pitbull' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='microchip'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Microchip</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Microchip' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='neutered'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex items-center space-x-2'>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id='neutered'
                        />
                        <Label htmlFor='neutered'>Castrado</Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} className='mt-4 bg-[#fcc44a]'>
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </form>
          </Form>
        </FormProvider>
      </div>
    </main>
  );
}
