import { Icons } from '@/components/Icons'
import UserAuthFormRegister from './UserForm/UserAuthFormRegister'
import Link from 'next/link'

const SignUp = () => {
  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <Icons.logo className='mx-auto h-6 w-6' />
        <h1 className='text-2xl font-semibold tracking-tight'>Sign Up</h1>
        <p className='text-sm max-w-xs mx-auto'>
        
        </p>
      </div>
      <UserAuthFormRegister />
      <p className='px-8 text-center text-sm text-muted-foreground'>
        Already account ?{' '}
        <Link
          href='/sign-in'
          className='text-[#0098FF] text-sm leading-5 font-medium hover:underline'>
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default SignUp
