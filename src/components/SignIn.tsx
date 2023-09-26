import { Icons } from '@/components/Icons'
import UserAuthForm from '@/components/UserForm/UserAuthForm'
import Link from 'next/link'

const SignIn = () => {
  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <Icons.logo className='mx-auto h-6 w-6' />
        <h1 className='text-2xl font-semibold tracking-tight'>Welcome back</h1>
        <p className='text-sm max-w-xs mx-auto'>
         
        </p>
      </div>
      <UserAuthForm/>
      <p className='px-8 text-center text-sm text-muted-foreground '>
        Don't have account ?{'   '}
        <Link
          href='/sign-up'
          className='text-[#0098FF] text-sm leading-5 font-medium hover:underline'>
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default SignIn
