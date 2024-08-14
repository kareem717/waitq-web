import { Icons } from '@/components/icons'

export default function Loading() {
  return (
    <div className="grid place-items-center animate-pulse text-neutral-300 p-4 h-screen w-screen">
      <div role="status">
        <Icons.spinner className='w-8 h-8 animate-spin' />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
