'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  return (
    <div className='p-8 flex flex-col gap-4'>
      <Tabs defaultValue='account' className='w-[400px]'>
        <TabsList>
          <TabsTrigger value='account'>Account</TabsTrigger>
          <TabsTrigger value='password'>Password</TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          {Object.keys(pet).map((key, index) => (
            <div key={index}>
              <div className='font-semibold text-xs'>{key}</div>
              <div className='pl-2 text-sm '>{pet[key]}</div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value='password'>
          {!!history.length ? (
            history.map((item, index) => (
              <div key={index}>
                <div className='pl-2 text-sm '>item.id</div>
              </div>
            ))
          ) : (
            <div>No history</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
