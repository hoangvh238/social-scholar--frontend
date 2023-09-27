'use client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { FC } from 'react'
import { toast } from "react-toastify"
import { Form, Formik } from "formik";
import {  forgotOTPSchema} from '../../../ultils/validation';
import InputForm from '../InputForm';
import { ValidationError } from 'yup';
import axios from 'axios';
import UserChangePassForm from './UserChangePassForm';
import { checkOTP } from '../../../apis/auth';
import { getCookie } from 'cookies-next';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }


type OTP = {
  otp : string;
  email : string;
}

type TOKEN = {
  token : string;
}


const UserOTPForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFillOTP,setIsFillOTP] = React.useState<boolean>(true)
  const [token,SetToken] = useState<TOKEN["token"]>("");
  const dispatch = useDispatch();
  const router = useRouter();

  const HandleSetToken = (value:string) =>{
      SetToken(value);
  }

  const onSubmit = async (values: OTP, actions: any) => {

    try { 
      values.email = getCookie("resetEmail") || "" ;
      let verifyToken = await checkOTP(values) || "";
      HandleSetToken(verifyToken.data.data); 
      
      setTimeout(() => { 
        setIsFillOTP(false)
      toast.success("Validated OTP success !");
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
   
    //export type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';
  }
};

  return (
    <div className={cn('flex justify-center flex-col content-center', className)} {...props}>
      {isFillOTP ?  <Formik
        initialValues={{ otp: ""}}
        validationSchema={forgotOTPSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='flex flex-col'>
            <div className="mb-6">
              <InputForm
                label="otp"
                name="otp"
                type="otp"
                id="otp"
                placeholder="OTP"
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
      </Formik> : <UserChangePassForm token={token}></UserChangePassForm>}
    </div>
  )
}

export default UserOTPForm


