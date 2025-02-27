'use client';

import { usePetContext } from '@/lib/hooks';
import Image from 'next/image';
import PetButton from '@/components/pet-button';
import { Pet } from '@prisma/client';

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className='flex flex-col h-full w-full'>
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <OtherPetInfo pet={selectedPet} />
          <PetNotes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

type Props = {
  pet: Pet;
};

// * page components
function TopBar({ pet }: Props) {
  const { handleCheckoutPet } = usePetContext();

  return (
    <div className='flex items-center bg-white px-5 py-5 border-b border-light'>
      <Image
        src={pet.imageUrl}
        alt='Selected pet image'
        height={50}
        width={50}
        className='h-[50px] w-[50px] md:h-[75px] md:w-[75px] rounded-full object-cover'
      />
      <h2 className='md:text-3xl text-2xl font-semibold leading-7 ml-5'>{pet.name}</h2>
      <div className='ml-auto space-x-2'>
        <PetButton actionType='edit'>Edit</PetButton>
        <PetButton
          actionType='checkout'
          onClick={async () => handleCheckoutPet(pet.id)}
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

function OtherPetInfo({ pet }: Props) {
  return (
    <div className='flex justify-around text-center py-10 px-5'>
      <div>
        <h3 className='text-[13px] font-medium uppercase text-zinc-700'>
          Owner name
        </h3>
        <p className='mt-1 text-lg text-zinc-800'>{pet.ownerName}</p>
      </div>

      <div>
        <h3 className='text-[13px] font-medium uppercase text-zinc-700'>Age</h3>
        <p className='mt-1 text-lg text-zinc-800'>{pet.age}</p>
      </div>
    </div>
  );
}

function PetNotes({ pet }: Props) {
  return (
    <section className='flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-black/[0.08]'>
      {pet.notes}
    </section>
  );
}

function EmptyView() {
  return (
    <p className='h-full flex justify-center items-center text-2xl font-medium text-black/50'>
      No pet selected..
    </p>
  );
}
