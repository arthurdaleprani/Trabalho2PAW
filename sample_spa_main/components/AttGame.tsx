'use client';

import { GamesContext } from '@/context/GamesContex';
import React, { useContext, useState } from 'react';

const AttGames = ({ }) => {
    const { addGames, UpdateGames, refreshPage } = useContext(GamesContext)
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
    const AttGame = async (e: React.FormEvent) => {
        e.preventDefault();

        if (_id === undefined) {
            "Não há jogo com esse ID"
            return;
        }

        try {
            await UpdateGames(_id, name, notaGame, generoGame, descGame);
            refreshPage();
        } catch (error) {
        }
    };
        return (
            <div className="text-center mt-10">
                <h3 className="mb-4 text-xl font-light">Atualizar Jogo</h3>
                <form onSubmit={AttGame}>
                    <div className="space-x-2 space-y-2 font-light">
                        <input
                            type="number"
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
                        <label htmlFor="nota" className="block text-gray-700 font-bold mb-1">Nota</label>
                        <input
                            type="number"
                            id="nota"
                            value={notaGame}
                            onChange={(e) => setNotaGame(parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Nota do Jogo"
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
                            placeholder="Descrição do Jogo"
                        />
                    </div>
    
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
    
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                    >
                        Atualizar
                    </button>
                </form>
            </div>
        );
    };
    
    export default AttGames;