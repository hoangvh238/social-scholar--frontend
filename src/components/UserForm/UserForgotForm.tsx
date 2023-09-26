"use client"
import { cn } from '@/lib/utils'
import React, { useState } from "react";
import { setCookie } from 'cookies-next';
import { useDispatch } from "react-redux";
import { FC } from 'react'
import { toast } from "react-toastify"
import Link from "next/link";
import { Form, Formik } from "formik";
import { forgotSchema } from '../../../ultils/validation';
import InputForm from '../InputForm';
import { ValidationError } from 'yup';
import axios from 'axios';
import { getOTP } from '../../../apis/auth';
import UserOTPForm from './UserOTPForm';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type GetOTP = {
  email : string;
}


const UserForgotForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFillEmail,setIsFillEmail] = React.useState<boolean>(true)
  const dispatch = useDispatch();


  const onSubmit = async (values: GetOTP, actions: any) => {

    try { 

      await getOTP(values);
      toast.success("Please check your mail !");
      toast.info(values.email);
      setCookie("resetEmail",values.email);
      actions.resetForm();
      setIsFillEmail(false);
    } catch (error: unknown) {
      
      if (error instanceof ValidationError) {
        if (error?.name === "ValidationError") {
          toast.error("Cannot sent");
        }
      }
      if (axios.isAxiosError(error)) {
        if (
          error.response?.status === 409
        ) {
          toast.error("Email not exits !");
        }
        if(error.response?.status === 403) 
        toast.error("OTP has been sent !");
      }
   
    //export type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';
  }
};

  return (
    <div className={cn('flex justify-center flex-col content-center', className)} {...props}>
      {isFillEmail ?  <Formik
        initialValues={{ email: ""}}
        validationSchema={forgotSchema}
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
           
            <button
              disabled={isSubmitting}
              type="submit"
              className="mb-6 bg-[#0065A9] disabled:opacity-50 hover:bg-[#005294] px-10 py-2 leading-6 font-medium rounded-[50px] text-white text-base"
            >
              Continute
            </button>
           
          </Form>
        )}
      </Formik> : <UserOTPForm></UserOTPForm>}
    </div>
  )
}

export default UserForgotForm


