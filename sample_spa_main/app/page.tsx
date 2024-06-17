"use client";
import { useRouter } from 'next/navigation';

const Home = async ({}) => {

  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };
  const handleRegister = () => {
    router.push('/Register');
  };

  return (
    <main className="h-screen">
      <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">
        Olá, seja bem vindo
      </h1>
      
      <p></p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>


      <div className="flex flex-col items-center">
  <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105 active:scale-100 mb-4">
    Login
  </button>
  
  <button onClick={handleRegister} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105 active:scale-100">
    Registrar-se
  </button>
</div>


</div>

    </main>
  );
};

export default Home;
