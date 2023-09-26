import { Icons } from '@/components/Icons'
import UserForgotForm from './UserForm/UserForgotForm'
import Link from 'next/link'


const Forgot = () => {
  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <Icons.logo className='mx-auto h-6 w-6' />
        <h1 className='text-2xl font-semibold tracking-tight'>Reset password</h1>
        <p className='text-sm max-w-xs mx-auto'>
        </p>
      </div>
      <UserForgotForm />
    </div>
  )
}

export default Forgot
