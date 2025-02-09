'use client';

import { createCheckoutSession } from '@/actions/actions';
import H1 from '@/components/h1';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PaymentPage({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const [isPending, startTransition] = useTransition();
  const { update, status, data: session } = useSession();
  const router = useRouter();

  return (
    <main className='flex flex-col items-center space-y-10'>
      <H1>PetSoft access requires payment</H1>

      {searchParams.success && (
        <Button
          className='w-full'
          disabled={status === 'loading' || session?.user.lifetimeAccess}
          onClick={async () => {
            await update(true);
            router.push('/app/dashboard');
          }}
        >
          Access PetSoft
        </Button>
      )}

      {!searchParams.success && (
        <Button
          disabled={isPending}
          className='w-full'
          onClick={async () => {
            startTransition(async () => {
              await createCheckoutSession();
            });
          }}
        >
          Buy lifetime access for R$ 499
        </Button>
      )}

      {searchParams.success && (
        <p className='border border-green-600 p-2 rounded-lg bg-green-800 text-sm text-white/70'>
          Payment successful! You now have lifetime access to PetSoft.
        </p>
      )}
      {searchParams.cancelled && (
        <p className='border border-red-600 p-2 rounded-lg bg-red-600 text-sm text-white/80'>
          Payment cancelled! You can try again.
        </p>
      )}
    </main>
  );
}
