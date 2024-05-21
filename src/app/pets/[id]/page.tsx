'use client';

import { useMemo, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const [pet, setPet] = useState<any>(() => {
    const storedPets = localStorage.getItem('pets') ?? '[]';
    const pets = JSON.parse(storedPets);
    // TODO: Create this type
    //@ts-expect-error
    return pets.find((pet) => pet.id === params.id);
  });

  const [history, setHistory] = useState<any[]>(() => {
    const history = localStorage.getItem('history') ?? '[]';
    const parsedHistory = JSON.parse(history);
    // TODO: Create this type
    //@ts-expect-error
    return parsedHistory.filter((item) => params.id === item.petId);
  });

  function handleDeleteHistory(id: string) {
    const history = localStorage.getItem('history') ?? '[]';
    const parsedHistory = JSON.parse(history);
    //@ts-expect-error
    const newHistory = parsedHistory.filter((item) => item.id !== id);
    localStorage.setItem('history', JSON.stringify(newHistory));
    setHistory(newHistory);
  }

  const router = useRouter();

  return (
    <div className='p-8 flex flex-col gap-4'>
      {/* mock image above pet name */}
      <div className='flex justify-center'>
        <Image
          className='w-24 h-24 rounded-full select-none'
          src='https://via.placeholder.com/150'
          alt={pet.name}
          width={150}
          height={150}
        />
      </div>
      <div className='text-center font-bold text-xl'>{pet.name}</div>

      <Tabs defaultValue='history' className='w-full'>
        <TabsList className='w-full'>
          <TabsTrigger className={'w-full'} value='about' defaultChecked>
            About
          </TabsTrigger>
          <TabsTrigger className={'w-full'} value='history'>
            History
          </TabsTrigger>
        </TabsList>
        <TabsContent value='about' className='flex flex-col gap-4'>
          {Object.keys(pet).map((key, index) => {
            if (key === 'id' || key === 'name') return null;
            return (
              <div key={index} className='flex flex-col gap-1 leading-none'>
                <div className='font-semibold'>{key}:</div>
                <div className='pl-1'>
                  {typeof pet[key] === 'boolean'
                    ? pet[key]
                      ? 'Yes'
                      : 'No'
                    : pet[key]}
                </div>
              </div>
            );
          })}
        </TabsContent>
        <TabsContent value='history' className='gap-4 flex flex-col'>
          {!!history.length ? (
            history.map((item, index) => (
              <Card key={item.id} className='overflow-hidden w-full '>
                <CardHeader className='w-full '>
                  <div className='flex justify-between'>
                    <CardTitle className='line-clamp-2 break-words hyphens-auto '>
                      {item.title}
                      {item.title}
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger className='w-fit h-fit'>
                        <MoreVertical className='size-5' />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side='left'>
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            handleDeleteHistory(item.id);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {!!item?.description && (
                    <CardDescription className='line-clamp-3 break-words hyphens-auto'>
                      {item.description}
                      {item.description}
                    </CardDescription>
                  )}
                </CardHeader>
                {/* <CardContent className='grid gap-4'>
                </CardContent> */}
                <CardFooter>
                  <div className='text-xs text-muted-foreground flex gap-1 justify-between w-full'>
                    <span>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(Number(item.expenses))}
                    </span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className='text-center rounded-md bg-slate-50 py-4 px-2 text-muted-foreground'>
              <div>No history found!</div>
              <Button
                className='p-0 h-fit w-fit text-black'
                variant={'link'}
                type='button'
                onClick={() => router.push(`/pets/${params.id}/history/create`)}
              >
                Try creating one here!
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
