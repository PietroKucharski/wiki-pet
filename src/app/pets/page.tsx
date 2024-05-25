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
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();
  const [pets, setPets] = useState<any[]>([]);

  useLayoutEffect(() => {
    const storedPets = localStorage?.getItem('pets') ?? '[]';
    return JSON.parse(storedPets);
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
      <div>
        <h1 className='w-full text-3xl font-semibold'>My Pets</h1>
        {!pets.length ? (
          <div className='leading-none'>
            <span className='w-full text-sm text-muted-foreground'>
              You don&apos;t have any pets yet.
            </span>
            <Button
              onClick={() => {
                router.push('/pets/create');
              }}
              className='text-slate-800 p-0 px-1 h-fit'
              variant={'link'}
            >
              Click here
            </Button>
            <span className='w-full text-sm text-muted-foreground'>
              to get started!
            </span>
          </div>
        ) : (
          <span className='w-full text-sm text-muted-foreground'>
            You have {pets.length} pets.
          </span>
        )}
      </div>
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
                    View
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      handlePetDelete(pet.id);
                    }}
                  >
                    Remove
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
