'use client';

import { useRouter } from 'next/navigation';

import { useLayoutEffect, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {MoreVertical, Plus} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {DropdownMenuDemo} from "@/components/header/button";

export default function Page() {
  const router = useRouter();
  const [pets, setPets] = useState<any[]>([]);

  useLayoutEffect(() => {
    setPets(() => {
      const storedPets = localStorage?.getItem('pets') ?? '[]';
      return JSON.parse(storedPets);
    });
  }, []);

  const handlePetDelete = (id: string) => {
    const storedPets = localStorage?.getItem('pets') ?? '[]';
    const pets = JSON.parse(storedPets);
    //@ts-expect-error
    const newPets = pets.filter((pet) => pet.id !== id);
    localStorage?.setItem('pets', JSON.stringify(newPets));
    setPets(newPets);

    const storedHistory = localStorage?.getItem('history') ?? '[]';
    const history = JSON.parse(storedHistory);
    //@ts-expect-error
    const newHistory = history.filter((item) => item.petId !== id);
    localStorage?.setItem('history', JSON.stringify(newHistory));
  };

  return (
    <main className='flex flex-col gap-6 p-8'>
      <DropdownMenuDemo/>
      <br></br>
      <div>
        <h1 className='w-full text-3xl font-semibold'>Meus Pets</h1>
        {!pets.length ? (
          <div className='leading-none'>
            <span className='w-full text-sm text-muted-foreground'>
              Você ainda não tem nenhum pet.
            </span>
            <Button
              onClick={() => {
                router.push('/pets/create');
              }}
              className='text-slate-800 p-0 px-1 h-fit'
              variant={'link'}
            >
              Clique aqui
            </Button>
            <span className='w-full text-sm text-muted-foreground'>
              para cadastrar!
            </span>
          </div>
        ) : (
          <span className='w-full text-sm text-muted-foreground'>
            Você tem {pets.length} pet(s).
          </span>
        )}
      </div>
      {pets.length > 0 && (
          <Button
              className='p-0 h-fit w-fit text-black self-end'
              variant={'link'}
              type='button'
              onClick={() => router.push(`/pets/create`)}
          >
            <Plus className='size-4'/> Adicionar novo pet
          </Button>
      )}
      {pets.map((pet, index) => (
        <Card key={pet.id} className='overflow-hidden w-full h-fit'>
          <CardHeader className='w-full '>
            <div className='flex justify-between'>
              <CardTitle className='line-clamp-2 break-words hyphens-auto '>
                {pet.name}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger className='w-fit h-fit'>
                  <MoreVertical className='size-5' />
                </DropdownMenuTrigger>
                <DropdownMenuContent side='left'>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push(`/pets/${pet.id}`);
                    }}
                  >
                    Visualizar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      handlePetDelete(pet.id);
                    }}
                  >
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription className='line-clamp-3 break-words hyphens-auto'>
              {pet.breed} - {pet.color}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </main>
  );
}
