import { Icons } from '@/components/icons'


export default function AuthErrorPage({ searchParams }: { searchParams: { error?: string | null } }) {
  let error;
  if (searchParams.error) {
    // i.e. The+redirect_uri+MUST+match+the+registered+callback+URL+for+this+application.
    error = searchParams.error.split('+').join(' ');
  } else {
    error = "Something went wrong!";
  }

  return (
    <div className="flex flex-col items-center gap-4 justify-center h-screen w-full px-4">
      <Icons.alert className='w-40 h-40 text-muted-foreground animate-pulse' />
      <h2 className='text-lg font-semibold'>{error} </h2>
    </div>
  )
}