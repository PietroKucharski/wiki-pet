'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Petlist() {
  const router = useRouter();
  const [pets, setPets] = useState<any[]>(() => {
    const storedPets = localStorage.getItem('pets') ?? '[]';
    return JSON.parse(storedPets);
  });

  return (
    <main className='flex flex-wrap min-h-screen p-8'>
      {pets.map((pet, index) => (
        <pre
          className='hover:cursor-pointer hover:bg-slate-50 h-fit'
          key={index}
          onClick={() => router.push(`/pets/${pet.id}`)}
        >
          {JSON.stringify(pet, null, 2)}
        </pre>
      ))}
    </main>
  );
}
