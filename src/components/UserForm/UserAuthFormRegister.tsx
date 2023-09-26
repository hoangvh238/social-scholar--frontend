"use client"
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux";
import { FC } from 'react'
import { Button } from '@/components/ui/Button'
import { toast } from "react-toastify"
import { Icons } from '../Icons'
import Link from "next/link";
import { Form, Formik } from "formik";
import { loginSchema, registerSchema } from '../../../ultils/validation';
import InputForm from '../InputForm';
import { registerAccount } from '../../../apis/auth';
import { ValidationError } from 'yup';
import axios from 'axios';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const UserAuthFormRegister: FC<UserAuthFormProps> = ({ className, ...props }) => {
  type UserRegister = {
    email: string,
    password: string,
    userName: string
  }
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter();
  const onSubmit = async (values: UserRegister, actions: any) => {
    try {
      console.log(values);
      
      await registerAccount(values);

      toast.success("Register success ! Check your email to validated");
      setTimeout(() => {  router.push('/sign-in');
      }, 500);
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        if (error?.name === "ValidationError") {
          toast.error(error.errors[0]);
        }
      }
      if (axios.isAxiosError(error)) {
        if (
          error.response?.status === 401 ||
          error.response?.status === 404 ||
          error.response?.status === 400
        ) {
          toast.error("Cannot register !");
        }
        if(error.response?.status === 409) 
       // var userError = error.response.data.errors.match(/\[(.*?)\]/);
        toast.error("User has been register !");
      }
      actions.resetForm();
    //export type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';
  }
};
  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
        signIn('google')
    } catch (error) {
      // toast({
      //   title: 'Error',
      //   description: 'There was an error logging in with Google',
      //   variant: 'destructive',
      // })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex justify-center flex-col content-center', className)} {...props}>
      <Button
        isLoading={isLoading}
        type='button'
        size='sm'
        className='w-full'
        onClick={loginWithGoogle}
        disabled={isLoading}>
        {isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
        Google
      </Button>
      <div className='mx-auto text-bold mt-5 mb-5 font-bold opacity-50'>OR</div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='flex flex-col'>
            <div className="mb-6">
              <InputForm
                label="email"
                name="email"
                type="email"
                id="email"
                placeholder="name@gmail.com"
              ></InputForm>
            </div>
            <div className="mb-6">

              <InputForm
                label="userName"
                type="userName"
                name="userName"
                id="text"
                placeholder="Enter your user name"
              ></InputForm>
            </div>
            <div className="mb-6">

              <InputForm
                label="password"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
              ></InputForm>
            </div>
            <div className="mb-6">

              <InputForm
                label="confirmPassword"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
              ></InputForm>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="mb-6 bg-[#0065A9] disabled:opacity-50 hover:bg-[#005294] px-10 py-2 leading-6 font-medium rounded-[50px] text-white text-base"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default UserAuthFormRegister
