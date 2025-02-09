import AuthForm from '@/components/auth-form';
import H1 from '@/components/h1';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <main>
      <H1 className='text-center mb-5'>Sign up</H1>
      <AuthForm type='signUp'/>
      <p className='mt-5 text-sm text-zinc-500'>
        Already have an account?{' '}
        <Link
          href={'/login'}
          className='mt-6 text-sm font-semibold text-zinc-500'
        >
          Log in
        </Link>
      </p>
    </main>
  );
}
