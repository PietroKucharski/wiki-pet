'use client';

import {Button} from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {zodResolver} from '@hookform/resolvers/zod';
import {create} from 'domain';
import {ChevronLeft} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {date, z} from 'zod';


interface PageProps {
    params: {
        id: string;
    };
}

const innerFormSchema = z.object({
    title: z.string({required_error: 'Title is required'}).min(3),
    description: z.string().optional(),
    files: z.array(z.string()).optional(),
});

const returnFormSchema = z.object({
    date: z.string(),
});

const wentToVeterinaryUnion = z.discriminatedUnion('wentToVeterinary', [
    z.object({
        wentToVeterinary: z.literal(true),
        vaccines: innerFormSchema,
    }),
    z.object({
        wentToVeterinary: z.literal(false),
    }),
]);

const medicationsUnion = z.discriminatedUnion('wasMedicated', [
    z.object({
        wasMedicated: z.literal(true),
        medications: innerFormSchema,
    }),
    z.object({
        wasMedicated: z.literal(false),
    }),
]);

const examsUnion = z.discriminatedUnion('hadExams', [
    z.object({
        hadExams: z.literal(true),
        exams: innerFormSchema,
    }),
    z.object({
        hadExams: z.literal(false),
    }),
]);

const returnUnion = z.discriminatedUnion('willReturn', [
    z.object({
        willReturn: z.literal(true),
        return: returnFormSchema,
    }),
    z.object({
        willReturn: z.literal(false),
    }),
]);

const formBaseSchema = z.object({
    date: z.string(),
    title: z.string({required_error: 'Title is required'}).min(3),
    description: z.string().optional(),
    expenses: z.string().optional(),
    petId: z.string(),
    id: z.string(),
    createdAt: z.string(),
});

//Mix all schemas together to create the final schema
const formSchema = formBaseSchema
    .and(wentToVeterinaryUnion)
    .and(medicationsUnion)
    .and(examsUnion)
    .and(returnUnion);

export default function Page({params}: PageProps) {
    const [pet, setPet] = useState<any>(() => {
        const storedPets = localStorage?.getItem('pets') ?? '[]';
        const pets = JSON.parse(storedPets);
        //TODO: Create this type
        //@ts-expect-error
        return pets.find((pet) => pet.id === params.id);
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            petId: params.id ?? '',
            createdAt: new Date().toISOString(),
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            title: '',
            description: '',
            expenses: '',
            wentToVeterinary: false,
            wasMedicated: false,
            hadExams: false,
            willReturn: false,
            medications: {
                title: '',
                description: '',
                files: [],
            },
            exams: {
                title: '',
                description: '',
                files: [],
            },
            vet: {
                title: '',
                description: '',
                files: [],
            },
            return: {
                date: '',
            },
        },
    });

    const router = useRouter();

    const wentToVeterinary = form.watch('wentToVeterinary');
    const wasMedicated = form.watch('wasMedicated');
    const hadExams = form.watch('hadExams');
    const willReturn = form.watch('willReturn');

    if (!pet) {
        return (
            <div className='p-8'>
                <Button
                    className='p-0 h-fit w-fit text-black'
                    variant={'link'}
                    type='button'
                    onClick={() => router.push(`/pets`)}
                >
                    <ChevronLeft className='size-4'/> Voltar aos pets
                </Button>
                <div className='text-2xl font-semibold text-center'>No pet found</div>
            </div>
        );
    }

    return (
        <div className='p-8'>
            <Form {...form}>
                <form
                    className='flex flex-col gap-4'
                    onSubmit={form.handleSubmit((data) => {
                        const storedHistoriesAsString =
                            localStorage?.getItem('history') ?? '[]';
                        const storedHistories = JSON.parse(storedHistoriesAsString);
                        const updatedHistories = [...storedHistories, data];
                        localStorage?.setItem('history', JSON.stringify(updatedHistories));
                        router.push(`/pets/${pet.id}?tab=history`);
                    })}
                >
                    <Button
                        className='p-0 h-fit w-fit text-black'
                        variant={'link'}
                        type='button'
                        onClick={() => router.push(`/pets/${pet.id}`)}
                    >
                        <ChevronLeft className='size-4'/> Voltar ao pet
                    </Button>
                    <div className='flex justify-center'>
                        <h1 className='font-bold text-xl mb-4'>Cadastrar Historico 📓</h1>
                    </div>
                    <FormField
                        control={form.control}
                        name='title'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Titulo</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Titulo'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <textarea
                        {...form.register('description')}
                        rows={3}
                        placeholder='Descrição'
                        className='border border-gray-300 rounded-md p-2 max-h-40 min-h-11'
                    />
                    <div className='flex gap-4'>
                        <input
                            id='wentToVeterinary'
                            {...form.register('wentToVeterinary')}
                            type='checkbox'
                            className='border border-gray-300 rounded-md p-2'
                        />
                        <label htmlFor='wentToVeterinary'>Foi ao veterinário?</label>
                    </div>
                    {wentToVeterinary && (
                        <div className='flex flex-col gap-4'>
                            <input
                                {...form.register('vet.title')}
                                type='text'
                                placeholder='Titulo do atendimento'
                                className='border border-gray-300 rounded-md p-2'
                            />
                            <textarea
                                {...form.register('vet.description')}
                                placeholder='Descrição do atendimento'
                                className='border border-gray-300 rounded-md p-2'
                            />
                            <input
                                {...form.register('vet.files')}
                                type='file'
                                multiple
                                className='border border-gray-300 rounded-md p-2'
                            />
                        </div>
                    )}

                    <div className='flex gap-4'>
                        <input
                            id='wasMedicated'
                            {...form.register('wasMedicated')}
                            type='checkbox'
                            className='border border-gray-300 rounded-md p-2'
                        />
                        <label htmlFor='wasMedicated'>Foi medicado?</label>
                    </div>
                    {wasMedicated && (
                        <div className='flex flex-col gap-4'>
                            <input
                                {...form.register('medications.title')}
                                type='text'
                                placeholder='Titulo'
                                className='border border-gray-300 rounded-md p-2'
                            />
                            <textarea
                                {...form.register('medications.description')}
                                placeholder='Descrição do medicamento'
                                className='border border-gray-300 rounded-md p-2'
                            />
                            <input
                                {...form.register('medications.files')}
                                type='file'
                                multiple
                                className='border border-gray-300 rounded-md p-2'
                            />
                        </div>
                    )}
                    <div className='flex gap-4'>
                        <input
                            id='hadExams'
                            {...form.register('hadExams')}
                            type='checkbox'
                            className='border border-gray-300 rounded-md p-2'
                        />
                        <label htmlFor='hadExams'>Fez exames?</label>
                    </div>
                    {hadExams && (
                        <div className='flex flex-col gap-4'>
                            <input
                                {...form.register('exams.title')}
                                type='text'
                                placeholder='Titulo'
                                className='border border-gray-300 rounded-md p-2'
                            />
                            <textarea
                                {...form.register('exams.description')}
                                placeholder='Descrição do(s) exame(s)'
                                className='border border-gray-300 rounded-md p-2'
                            />
                            <input
                                {...form.register('exams.files')}
                                type='file'
                                multiple
                                className='border border-gray-300 rounded-md p-2'
                            />
                        </div>
                    )}

                    <div className='flex gap-4'>
                        <input
                            id='willReturn'
                            {...form.register('willReturn')}
                            type='checkbox'
                            className='border border-gray-300 rounded-md p-2'
                        />
                        <label htmlFor='willReturn'>Tem retorno?</label>
                    </div>
                    {willReturn && (
                        <input
                            {...form.register('return.date')}
                            type='date'
                            className='border border-gray-300 rounded-md p-2'
                        />
                    )}

                    <FormField
                        control={form.control}
                        name='expenses'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Gastos</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Insira o valor que foi gasto...'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <button
                        type='submit'
                        className='bg-blue-500 text-white p-2 rounded-md'
                    >
                        Criar Histórico
                    </button>
                </form>
            </Form>
        </div>
    );
}
