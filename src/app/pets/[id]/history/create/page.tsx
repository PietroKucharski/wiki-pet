'use client';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { describe } from 'node:test';
import { title } from 'process';
import { useForm } from 'react-hook-form';
import { date, z } from 'zod';

interface PageProps {}

const innerFormSchema = z.object({
  title: z.string({ required_error: 'Title is required' }).min(3),
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
  title: z.string({ required_error: 'Title is required' }).min(3),
  description: z.string().optional(),
});

//Mix all schemas together to create the final schema
const formSchema = formBaseSchema
  .and(wentToVeterinaryUnion)
  .and(medicationsUnion)
  .and(examsUnion)
  .and(returnUnion);

export default function Page({}: PageProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString(),
      title: '',
      description: '',
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
      vaccines: {
        title: '',
        description: '',
        files: [],
      },
      return: {
        date: '',
      },
    },
  });

  const wentToVeterinary = form.watch('wentToVeterinary');
  const wasMedicated = form.watch('wasMedicated');
  const hadExams = form.watch('hadExams');
  const willReturn = form.watch('willReturn');
  console.log(form.formState.errors);
  return (
    <div className='p-8'>
      <Form {...form}>
        <form
          className='flex flex-col gap-4'
          onSubmit={form.handleSubmit((data) => {
            console.log(data);
          })}
        >
          <input
            {...form.register('date')}
            type='date'
            className='border border-gray-300 rounded-md p-2'
          />
          <input
            {...form.register('title')}
            type='text'
            placeholder='Title'
            className='border border-gray-300 rounded-md p-2'
          />
          <textarea
            {...form.register('description')}
            placeholder='Description'
            className='border border-gray-300 rounded-md p-2'
          />
          <div className='flex gap-4'>
            <input
              id='wentToVeterinary'
              {...form.register('wentToVeterinary')}
              type='checkbox'
              className='border border-gray-300 rounded-md p-2'
            />
            <label htmlFor='wentToVeterinary'>Was Vaccinated</label>
          </div>
          {wentToVeterinary && (
            <div className='flex flex-col gap-4'>
              <input
                {...form.register('vaccines.title')}
                type='text'
                placeholder='Vaccine Title'
                className='border border-gray-300 rounded-md p-2'
              />
              <textarea
                {...form.register('vaccines.description')}
                placeholder='Vaccine Description'
                className='border border-gray-300 rounded-md p-2'
              />
              <input
                {...form.register('vaccines.files')}
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
            <label htmlFor='wasMedicated'>Was Medicated</label>
          </div>
          {wasMedicated && (
            <div className='flex flex-col gap-4'>
              <input
                {...form.register('medications.title')}
                type='text'
                placeholder='Medication Title'
                className='border border-gray-300 rounded-md p-2'
              />
              <textarea
                {...form.register('medications.description')}
                placeholder='Medication Description'
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
            <label htmlFor='hadExams'>Had Exams</label>
          </div>
          {hadExams && (
            <div className='flex flex-col gap-4'>
              <input
                {...form.register('exams.title')}
                type='text'
                placeholder='Exam Title'
                className='border border-gray-300 rounded-md p-2'
              />
              <textarea
                {...form.register('exams.description')}
                placeholder='Exam Description'
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
            <label htmlFor='willReturn'>Will Return</label>
          </div>
          {willReturn && (
            <input
              {...form.register('return.date')}
              type='date'
              className='border border-gray-300 rounded-md p-2'
            />
          )}
          <button
            type='submit'
            className='bg-blue-500 text-white p-2 rounded-md'
          >
            Save
          </button>
        </form>
      </Form>
    </div>
  );
}
