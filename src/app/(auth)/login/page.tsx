import AuthForm from '@/components/auth-form';
import H1 from '@/components/h1';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main>
      <H1 className='text-center mb-5'>Log in</H1>
      <AuthForm type='logIn'/>
      <p className='mt-5 text-sm text-zinc-500'>
        No account yet?{' '}
        <Link
          href={'/signup'}
          className='mt-6 text-sm font-semibold text-zinc-500'
        >
          Sign up
        </Link>
      </p>
    </main>
  );
}
