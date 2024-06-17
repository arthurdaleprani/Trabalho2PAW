"use client";

import React, { useContext, useState, useEffect } from 'react';
import { GamesContext, Games, Stage } from "@/context/GamesContex";

const ListProduct = () => {
    const { games, removeGames, deleteGames, updatGames} = useContext(GamesContext);
    const [selectedTab, setSelectedTab] = useState(Stage.Esportes);

    const options = Object.keys(Stage)
        .filter((item) => isNaN(Number(item)))
        .map((item) => ({
            label: item,
            value: Stage[item as keyof typeof Stage]
        }));

        updatGames();
    
    return (
        <div className="text-center">
            <h2 className="mb-4 text-xl font-semibold text-gray-600">
                Lista de Jogos
            </h2>
            <div className='flex gap-2 text-gray-700 mb-4'>
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedTab(option.value)}
                        className={selectedTab === option.value ? 'active-tab' : ''}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <ul className="max-w-md space-y-1 text-gray-700 text-center mb-4">

                {games.map((games: Games, index: number) => (
                    
                    <>{games.category == selectedTab && 
                        <li className='font-light mt-3'> Nome: {games.name} | Descrição: {games.description}

                    {"   "}   <button className= "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline" 
                            onClick={() => {
                            removeGames(index);
                            deleteGames(games._id);
                            }}>
                            Deletar
                        </button>
                    
                        </li>
                    }</>
                    
                ))}

            </ul>
            
        </div>
    );
};

export default ListProduct;
