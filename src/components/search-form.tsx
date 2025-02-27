'use client';

import { useSearchContext } from '@/lib/hooks';

export default function SearchForm() {
  const { handleChangeSearchQuery, searchQuery } = useSearchContext();

  return (
    <form action='' className='w-full h-full'>
      <input
        type='search'
        className='rounded-md w-full h-full bg-white/20 px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/30'
        placeholder='Search pets'
        value={searchQuery}
        onChange={(e) => handleChangeSearchQuery(e.target.value)}
      />
    </form>
  );
}
