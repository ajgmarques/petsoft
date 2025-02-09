import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main
      className='
      flex flex-col xl:flex-row items-center justify-center gap-10
      bg-[#5dc9a8] min-h-screen max-sm:px-3'
    >
      <Image
        className='rounded-lg'
        src={'/petsoft-preview.png'}
        alt='PetSoft preview'
        width={519}
        height={472}
      />
      <div>
        <Logo />

        <h1
          className='xl:text-5xl text-5xl max-sm:text-3xl
          font-semibold my-6 max-w-[500px]'
        >
          Manage your <span className='font-extrabold'>pet daycare</span> with
          ease
        </h1>
        <p className='text-2xl max-sm:text-xl font-medium max-w-[600px]'>
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for $299
        </p>
        <div className='mt-10 space-x-4'>
          <Button asChild>
            <Link href={'/signup'}> Get Started</Link>
          </Button>
          <Button asChild variant={'secondary'}>
            <Link href={'/login'}>Log in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
