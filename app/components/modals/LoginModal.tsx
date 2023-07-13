'use client'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from "react-icons/fc"
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';

import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisteredModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/inputs';
import { toast } from 'react-hot-toast';
import { Butcherman } from 'next/font/google';
import Button from '../navbar/Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);

            if(callback?.ok){
                toast.success('Logged in');
                router.refresh();
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title={'Welcome Back'} 
                     subtitle='Login to your account'
            />
            <Input 
                id="email" 
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required/>

            <Input 
                id="password" 
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required/>
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => {}} />
            <Button outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => {}} />
            <div className='text-neutral-500
                text-center
                mt-4
                font-light'>
                <div
                    onClick={registerModal.onClose} 
                    className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div className='text-neutral-800 cursor-pointer hover:underline'>
                        Log In
                    </div>
                </div>
               
            </div>
        </div>
    )

    return (
        <div>
            <Modal 
                disabled={isLoading} 
                isOpen={LoginModal.isOpen} 
                title="Login" 
                actionLabl="Continue" 
                onClose={LoginModal.onClose}
                onSubmit={handleSubmit(onSubmit)} 
                body={bodyContent}
                footer={footerContent}
            />
        </div>
    );
}

export default LoginModal;