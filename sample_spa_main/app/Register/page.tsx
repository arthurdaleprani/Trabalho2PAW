"use client";

import { AuthContext } from "@/context/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { useContext } from "react";
import { useRouter } from "next/navigation";

interface IFormInput {
  username: string;
  password: string;
}

const Register = () => {
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  
  const onSubmit: SubmitHandler<IFormInput> = ({ username, password }) => {
    const isAdmin = true;
    registerUser(username, password, isAdmin);
    router.push('/login'); 
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Usuário:</label>
          <input 
            {...register('username', { required: true })}
            type="text" 
            id="username" 
            placeholder="Seu usuário" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.username && <p className="text-red-500 text-xs italic">O usuário é obrigatório.</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Senha:</label>
          <input 
            {...register('password', { required: true })}
            type="password" 
            id="password" 
            placeholder="Sua senha" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && <p className="text-red-500 text-xs italic">A senha é obrigatória.</p>}
        </div>

        <div className="flex items-center justify-between">
          <input 
            type="submit" 
            value="Registrar" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
