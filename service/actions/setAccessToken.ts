'use server';

import { authKey } from '@/constants/authkey';
import { cookies } from 'next/headers';

import { redirect } from 'next/navigation';

const setAccessToken = (token: string, option?: any) => {
   cookies().set(authKey, token);
   
};

export default setAccessToken;
