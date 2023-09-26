'use client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FC } from 'react'
import { Button } from '@/components/ui/Button'
import { toast } from "react-toastify"
import { Icons } from '../Icons'
import Link from "next/link";
import { Form, Formik } from "formik";
import { loginSchema } from '../../../ultils/validation';
import InputForm from '../InputForm';
import { loginAccount } from '../../../apis/auth';
import { ValidationError } from 'yup';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { login } from '../../../redux/slices/userInfor';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type UserLogin = {
  userName: string;
  password: string;
}


type EncodeType = {
  email: string;
  userName: string,
  phone: string,
  role: string,
  token: number
}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (values: UserLogin, actions: any) => {
  
    try { 
      const loginResponse =  await loginAccount(values);
      
      const token = await loginResponse.data
      var decoded:EncodeType =  jwt_decode(token.data.token);
      const user = {
        email: decoded!.email,
        userName: decoded!.userName,
        role: decoded!.role,
        token: decoded!.token,
        phone: decoded!.phone
      };
      dispatch(
        login({
          token,
          user
        })
      );
      
      toast.success("Login success !");
      router.push('/')
      setTimeout(() => {  ;
      }, 500);
    } catch (error: unknown) {
      
      if (error instanceof ValidationError) {
        if (error?.name === "ValidationError") {
          toast.error("Cannot login");
        }
      }
      if (axios.isAxiosError(error)) {
        if (
          error.response?.status === 401 ||
          error.response?.status === 404 ||
          error.response?.status === 400
        ) {
          toast.error("Wrong password or username");
        }
        if(error.response?.status === 422) 
        var userError = error.response.data.errors.match(/\[(.*?)\]/);
        toast.error(userError[1]+" has not confirmed username");
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
        initialValues={{ userName: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='flex flex-col'>
            <div className="mb-6">
              <InputForm
                label="userName"
                name="userName"
                type="text"
                id="text"
                placeholder="Username..."
              ></InputForm>
            </div>
            <div className="mb-6">
              <InputForm
                label="password"
                type="password"
                name="password"
                id="password"
                placeholder="Password..."
              ></InputForm>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="mb-6 bg-[#0065A9] disabled:opacity-50 hover:bg-[#005294] px-10 py-2 leading-6 font-medium rounded-[50px] text-white text-base"
            >
              Login
            </button>
            <div className="flex w-full space-x-2 items-center justify-center">
              <div className='text-sm opacity-60'>Forgot your password?</div>
              <Link
                href="/forgot"
                className="text-[#0098FF] text-xs leading-5 font-medium hover:underline"
              >
                {" "}
                Reset
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default UserAuthForm


