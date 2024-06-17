"use client";

import { createContext, useState } from "react";
import { request } from '../services/request';
import { setCookie } from 'nookies';
import { useRouter } from "next/navigation";

export type SignIdData = {
    username: string;
    password: string;
}

type AuthContextType = {
    login: (data: SignIdData) => void;
    authError: string | null;
    registerUser: (username: string, password: string, isAdmin: boolean) => void;
}

type UserAuthentication = {
    'x-access-token': string
}

type RegisterResponse = { 
    'statusCode': number
}

export const AuthContext = createContext({} as AuthContextType);


export default function AuthProvider( { children }: { children: React.ReactNode } ){
    const [authError, setAuthError] = useState<string | null>(null);

    const router = useRouter();

    async function login({username, password} : SignIdData) {
        
        let {'x-access-token': token} = await request<UserAuthentication>('http://127.0.0.1:5000/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password}),
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        });

        if(!token) setAuthError('Usuário ou senha inválidos. Verifique e tente novamente!');
        else{
            setCookie(null, 'auth.token', token, {
                maxAge: 60 * 60 * 1,
            });
            
            router.push('/Games');
        }
    }

    const registerUser = async (username:string, password:string, isAdmin:boolean) => {
        let res = await request<RegisterResponse>('http://127.0.0.1:5000/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password, isAdmin}),
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        },)
        if(res.statusCode == 201) { 
            router.push('/login')
        } else {
            ('Erro no Login')
        }
    }
    
    return (
        <AuthContext.Provider value={{login, authError, registerUser}} >
            {children}
        </AuthContext.Provider>
    );
};