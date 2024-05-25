'use client';

import React, {useState} from 'react';
import axios from 'axios';
import {Avatar} from '@/components/ui/avatar';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
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
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@tanstack/react-query';
import {ChevronLeft} from 'lucide-react';
import Image from 'next/image';
import {useParams, useRouter} from 'next/navigation';
import {FormProvider, useForm} from 'react-hook-form';
import {toast} from 'sonner';
import {z} from 'zod';
import {DropdownMenuDemo} from '../../../components/header/button';
import {Textarea} from '../../../components/ui/textarea';
import {Checkbox} from '../../../components/ui/checkbox';
import {Switch} from '../../../components/ui/switch';
import {Label} from '../../../components/ui/label';
import {PerfilImagePet} from '@/components/perfilIamgePet/perfilImagePet';

const createPetFormValidation = z.object({
    id: z.string(),
    name: z.string(),
    petType: z.string(),
    gender: z.boolean(),
    customPetType: z.string().optional(),
    age: z.string(),
    weight: z.string(),
    color: z.string(),
    breed: z.string(),
    microchip: z.string(),
    neutered: z.boolean(),
});

type CreatePetFormData = z.infer<typeof createPetFormValidation>;

export default function CreatePetForm() {
    const router = useRouter();
    const [avatar, setAvatar] = useState<File | null>(null);

    const {mutateAsync: createPetMutation} = useMutation({
        mutationFn: async (formData: FormData) => {
            console.log('Dados do formulário antes de enviar:', formData); // Console log
            const response = await axios.post(
                `${process.env.REACT_APP_WIKIPET_API_URL}/pet/create`,
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}}
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
        //         petType: data.petType,
        //         customPetType: data.customPetType,
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
            const oldPets = localStorage.getItem('pets') ?? '[]';
            const oldPetsArray = JSON.parse(oldPets);
            //TODO: Fix this type
            localStorage.setItem('pets', JSON.stringify([...oldPetsArray, data]));
            toast.success('Pet cadastrado com sucesso');
            router.push('/pets');
        } catch (error) {
            toast.error('Erro no cadastro');
        }
    }

    const form = useForm<CreatePetFormData>({
        resolver: zodResolver(createPetFormValidation),
        defaultValues: {
            neutered: true,
            id: crypto.randomUUID(),
        },
    });

    const {
        handleSubmit,
        formState: {isSubmitting},
        control,
        watch,
    } = form;

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAvatar(file);
        }
    };

    return (
        <main className='flex min-h-screen flex-col items-center justify-center p-8'>
            <DropdownMenuDemo/>
            <div className='flex flex-col z-10 w-full max-w-5xl items-center justify-center text-sm'>
                <h1 className='font-bold text-xl mb-4'>Cadastrar seu pet 🐶😺</h1>
                <div className='flex flex-col items-center'>
                    <label className='block text-sm font-medium text-gray-700'>
                        Imagem
                    </label>
                    <div className='mt-2 flex flex-col items-center'>
            <span className='inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100'>
              {avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                      src={URL.createObjectURL(avatar)}
                      alt='Avatar'
                      className='h-full w-full object-cover'
                  />
              ) : (
                  <Avatar className='h-full w-full'/>
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
                                    Selecione a imagem
                                </button>
                            </div>
                            {avatar && (
                                <button
                                    onClick={() => setAvatar(null)}
                                    className='px-4 py-2 bg-red-500 text-white rounded'
                                >
                                    Remova a imagem
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
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Qual o nome do seu bichinho?'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name='petType'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Tipo de animal</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Selecione o tipo do seu animal'/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='Cachorro'>Cachorro</SelectItem>
                                                <SelectItem value='Gato'>Gato</SelectItem>
                                                <SelectItem value='Outro'>Outro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name='gender'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Gênero</FormLabel>
                                        <FormControl>
                                            <div className='flex items-center space-x-2'>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    id='gender'
                                                />
                                                <Label htmlFor='gender'>{field.value ? 'Macho' : 'Fêmea'}</Label>
                                            </div>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            {watch('petType') === 'Outro' ? (
                                <FormField
                                    control={control}
                                    name='customPetType'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Informe o tipo do seu animal</FormLabel>
                                            <FormControl>
                                                <Input
                                                    required
                                                    placeholder='Exemplo: Cavalo'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            ) : null}
                            <FormField
                                control={control}
                                name='age'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Idade</FormLabel>
                                        <FormControl>
                                            <Input type='text' placeholder='Exemplo: 2' {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name='weight'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Peso</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                placeholder='Exemplo: 4.5'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name='color'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Cor</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Preto' {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name='breed'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Raça</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Pitbull' {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name='microchip'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Microchip</FormLabel>
                                        <FormControl>
                                            <Input type='text' placeholder='Microchip' {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name='neutered'
                                render={({field}) => (
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
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button disabled={isSubmitting} className='mt-4 bg-[#fcc44a]'>
                                {isSubmitting ? 'Cadastrando…' : 'Cadastrar'}
                            </Button>
                        </form>
                    </Form>
                </FormProvider>
            </div>
        </main>
    );
}
