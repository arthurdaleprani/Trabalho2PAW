"use client";

import { AuthContext } from "@/context/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

interface IFormInput {
  username: string;
  password: string;
}

const Register = () => {
  const router = useRouter()
  const { registerUser } = useContext(AuthContext);
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isAdmin, setAdmin] = useState<boolean>(true)
  const usuario = (username:string, password:string, isAdmin:boolean) => {
      isAdmin = true
      registerUser(username, password, isAdmin);
  }


  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Usuário:</label>
          <input 
            type="text"
            name='username'
            id='username'
            placeholder="Seu Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Senha:</label>
          <input 
           
            type="password"
            name='password'
            id='password'
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button 
            type="button" 
            value="Registrar" 
            onClick={() => {
              usuario(username, password, isAdmin) 
              router.push('/login') 
          }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          >
            Resgistrar-Se
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
