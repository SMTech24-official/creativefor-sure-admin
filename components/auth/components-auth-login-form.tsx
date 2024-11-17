'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import IconMail from '../icon/icon-mail';
import IconLockDots from '../icon/icon-lock-dots';
import { loginFormSchema, LoginFormValues } from '@/app/(auth)/login/LoginSchema';
import { toast } from 'sonner';
import { addTokenToLocalStorage } from '@/utils/tokenHandler';
import { useLoginMutation } from '@/store/api/auth/authApi';

const ComponentsAuthLoginForm = () => {
    const router = useRouter();
    const [login, { isLoading }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        const loadingToastId = toast.loading('Logging in...');

        try {
            const res = await login(data).unwrap();

            if (res?.success) {
                toast.success(res?.message, {
                    duration: 3000,
                    id: loadingToastId,
                });
            } else {
                toast.error(res?.message, {
                    duration: 3000,
                    id: loadingToastId,
                });
            }
        } catch (error: any) {
            toast.error('Invalid Credentials', {
                duration: 3000,
                id: loadingToastId,
            });
        }
    };

    return (
        <form className="space-y-5 dark:text-white" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="Email">Email</label>
                <div className="relative text-white-dark">
                    <input
                        id="Email"
                        type="email"
                        placeholder="Enter Email"
                        className={`form-input ps-10 placeholder:text-white-dark ${errors.email ? 'border-red-500' : ''}`}
                        {...register('email')}
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconMail fill={true} />
                    </span>
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="Password">Password</label>
                <div className="relative text-white-dark">
                    <input
                        id="Password"
                        type="password"
                        placeholder="Enter Password"
                        className={`form-input ps-10 placeholder:text-white-dark ${errors.password ? 'border-red-500' : ''}`}
                        {...register('password')}
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconLockDots fill={true} />
                    </span>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                Sign in
            </button>
        </form>
    );
};

export default ComponentsAuthLoginForm;
