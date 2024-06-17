"use client";

import React, { createContext, useState } from 'react';
import { request } from '@/services/request';


export enum Stage {
    Esportes,
    Terror,
    Aventura,
    MOBA,
    RPG,
}

export type Games = {
_id : number
description : string
name : string
category : Stage
avalicao : number
}

type ContextGames = {
    games: Games[];
    addGames: (_id:number, name:string, category:Stage, avalicao:number, description:string) => void;

    updatGames: () => void;

    updatedGames: boolean;

    removeGames: (index: number) => void;
    changeGames: (index: number, newStage: Stage) => void;
    deleteGames : (index: number) => void;
};

export const GamesContext = createContext({} as ContextGames);

export const GamesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [games, setGames] = useState<Games[]>([]);

    const [loadingGames, setLoadingGames] = useState(false);

    const [updatedGames, setUpdatedGames] = useState(false);


    const addGames = (_id:number, name:string, category:Stage, avalicao:number, description:string) => {
        let newGames = {
            _id: _id,
            name: name,
            category: category,
            avalicao: avalicao,
            description: description
        }
        setGames([...games, newGames]);
    };

    const removeGames = (index: number) => {
        setGames(games.filter((_, idx) => idx !== index));
    };

    const deleteGames = async (_id : number) => {
        try {
            const response = await request(`http://127.0.0.1:5000/games/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9pIiwiaWF0IjoxNzE4MzI0NjUzfQ.V6ewEFTfTdzoJf8DULI9yVE7c8WKI2fPoV5FE8xsqs0'
                },
                referrerPolicy: 'no-referrer',
                cache: 'no-store'
            });

        } catch (error) {
            console.error('Erro ao realizar a requisição', error);
        }
    };

    const updatGames = async () => {
        if(!updatedGames){
            let res = await request<Games[]>('http://127.0.0.1:5000/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                cache: 'no-store'
            },
        );
            setGames(res);
            setUpdatedGames(true);
        }
    }



    const changeGames = (index: number, newStage: Stage) => {
        let updatedGames = [...games];
        updatedGames[index].category = newStage;
        setGames(updatedGames);
    };

    return (
        <GamesContext.Provider value={{ games, addGames, removeGames, changeGames, deleteGames, updatedGames, updatGames }}>
            {children}
        </GamesContext.Provider>
    );
};
