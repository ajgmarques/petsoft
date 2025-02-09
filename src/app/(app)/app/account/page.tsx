import ContentBlock from '@/components/content-block';
import H1 from '@/components/h1';
import SignOutBtn from '@/components/sign-out-btn';
import { checkAuth } from '@/lib/server-utils';

export default async function Account() {
  const session = await checkAuth();
  return (
    <main>
      <H1 className='my-8 text-white'>Your Account</H1>

      <ContentBlock className='flex flex-col gap-3 items-center justify-center h-[500px] md:h-[600px]'>
        <p>
          Logged in as{' '}
          <span className='font-semibold'>{session.user.email}</span>
        </p>
        <SignOutBtn />
      </ContentBlock>
    </main>
  );
}
