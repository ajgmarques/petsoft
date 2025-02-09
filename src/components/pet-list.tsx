'use client';

import { usePetContext, useSearchContext } from '@/lib/hooks';
import { cn, differenceInDays } from '@/lib/utils';
import Image from 'next/image';
import { useMemo } from 'react';

export default function PetList() {
  const { pets, handleChangeSelectedPetId, selectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();

  const filteredPets = useMemo(
    () =>
      pets.filter((pet) =>
        pet.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [pets, searchQuery]
  );

  return (
    <ul className='bg-white border-b border-light'>
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleChangeSelectedPetId(pet.id)}
            className={cn(
              'flex items-center h-[75px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#eff1f2] focus:bg-[#eff1f2] transition',
              { 'bg-[#eff1f2]': selectedPetId === pet.id }
            )}
          >
            <Image
              src={pet.imageUrl}
              alt='Pet image'
              width={50}
              height={50}
              className='w-[50x] h-[50px] rounded-full object-cover'
            />

            <div className='flex flex-col text-left'>
              <p className='font-semibold'>{pet.name}</p>
              <p className='text-xs'>
                {new Date(pet.createdAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  weekday: 'short',
                })}
              </p>
              <p className='text-xs'>
                {differenceInDays(pet.createdAt)}
                {differenceInDays(pet.createdAt) < 2 ? ' day ' : ' days '}
              </p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
