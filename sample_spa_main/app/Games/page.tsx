import React from 'react';
import { GamesContextProvider } from "@/context/GamesContex";
import ListGames from '@/components/Games';
import AddGames from '@/components/AddGames';

const Games = () => {
  return (
    <main className="h-screen">
      <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">
        Gerenciamento de Jogos
      </h1>

      <div className="grid place-items-center">
        <GamesContextProvider>
          
        <AddGames/>

        <ListGames/>
       
        </GamesContextProvider>
      </div>
    </main>
  );
};

export default Games;
