'use client';

import { GamesContext } from '@/context/GamesContex';
import React, { useContext, useState } from 'react';
import { request } from '@/services/request'; 

const AddGames= () => {
    const { addGames } = useContext(GamesContext);

    const [descGame, setDescGame] = useState('');
    const [_id, setId] = useState<number | undefined>();
    const [name, setName] = useState('');
    const [generoGame, setGeneroGame] = useState(0);
    const [notaGame, setNotaGame] = useState(0);

    const Stage = {
        Esportes: 0,
        Terror: 1,
        Aventura: 2,
        MOBA: 3,
        RPG: 4,
    };

    const handleSaveGames = async () => {
        const games = {
            descGame,
            _id,
            name,
            generoGame,
            notaGame
        };

        try {
            if (_id !== undefined)
            addGames (_id, name, generoGame, notaGame, descGame)
            const save = await request('http://127.0.0.1:5000/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoib2lzYXNhIiwiaWF0IjoxNzE4NjYzNTg4fQ.Fvo0Bn1TABDTbNmOnsyIdixB63d_zFR7o87wpiVHKsY', 
                    'isAdmin': 'true'
                },
                referrerPolicy: 'no-referrer',
                cache: 'no-store',
                body: JSON.stringify({_id, generoGame, notaGame, name, descGame})
            });

            if (save == true) {
              
                setDescGame('');
                setId(undefined);
                setName('');
                setGeneroGame(0);
                setNotaGame(0);
            } else {
                console.error('Erro ao salvar o Jogo');
            }
        } catch (error) {
            console.error('Erro ao realizar a requisição', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Adicionar um jogo a sua blibioteca</h2>
        <form className="space-y-4">
            <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2 mb-4">

                    <label htmlFor="id" className="block text-gray-700 font-bold mb-1">Id</label>
                    <input 
                        type="string"
                        id="id"
                        value={_id}
                        onChange={(e) => setId(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Id"
                    />
                </div>

                <div className="w-full md:w-1/2 px-2 mb-4">
                
                    <label htmlFor="nome" className="block text-gray-700 font-bold mb-1">Nome</label>
                    <input 
                        type="text"
                        id="nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Nome do Jogo"
                    />
                </div>


                <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="descricao" className="block text-gray-700 font-bold mb-1">Nota:</label>
                    <input 
                        type="text"
                        id="nota"
                        value={notaGame}
                        onChange={(e) => setNotaGame(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Descrição do jogo"
                    />
                </div>
                
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="descricao" className="block text-gray-700 font-bold mb-1">Descrição</label>
                    <input 
                        type="text"
                        id="descricao"
                        value={descGame}
                        onChange={(e) => setDescGame(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Descrição do jogo"
                    />
                </div>
            </div>
            
          
            <div className="flex flex-wrap -mx-2">
                <div className="w-full px-2 mb-4">
                    <label htmlFor="categoria" className="block text-gray-700 font-bold mb-1">Categoria</label>
                    <select
                        id="categoria"
                        value={generoGame}
                        onChange={(e) => setGeneroGame(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >
                        <option>Selecione a categoria</option>
                        <option value={Stage.Esportes}>Esportes</option>
                        <option value={Stage.Terror}>Terror</option>
                        <option value={Stage.Aventura}>Aventura</option>
                        <option value={Stage.MOBA}>Moba</option>
                        <option value={Stage.RPG}>RPG</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-center">
                <button 
                    type="button"
                    onClick={handleSaveGames}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                >
                    Salvar Games
                </button>
            </div>
        </form>
    </div>
    
    );
};

export default AddGames;
