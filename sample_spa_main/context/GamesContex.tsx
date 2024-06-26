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
descGame : string
name : string
generoGame : Stage
notaGame : number
}

type ContextGames = {
    games: Games[];
    addGames: (_id:number, name:string, generoGame:Stage, notaGame:number, descGame:string) => void;

    updatGames: () => void;

    updatedGames: boolean;
    UpdateGames:(_id:number, name:string, notaGame:number, generoGame:Stage, descGame:string)=>void;
    removeGames: (index: number) => void;
    changeGames: (index: number, newStage: Stage) => void;
    deleteGames : (index: number) => void;
    refreshPage: () => void;
};

export const GamesContext = createContext({} as ContextGames);

export const GamesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [games, setGames] = useState<Games[]>([]);

    const [loadingGames, setLoadingGames] = useState(false);

    const [updatedGames, setUpdatedGames] = useState(false);


    const addGames = (_id:number, name:string, generoGame:Stage, notaGame:number, descGame:string) => {
        let newGames = {
            _id: _id,
            name: name,
            generoGame: generoGame,
            notaGame: notaGame,
            descGame: descGame
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
            let res = await request<Games[]>('http://127.0.0.1:5000/games', {
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

    const refreshPage = () => { 
        window.location.reload(); 
    }


    const changeGames = (index: number, newStage: Stage) => {
        let updatedGames = [...games];
        updatedGames[index].generoGame = newStage;
        
        setGames(updatedGames);
    };


    const UpdateGames = async (_id:number, name:string, notaGame:number, generoGame:Stage, descGame:string) => {
        let res = await request<Games>(`http://127.0.0.1:5000/games/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hcm5lIiwiaWF0IjoxNzE4NTQyNzI5fQ.ygB9dsOhg7XmJzzV61hSoLK3qoy00v0wnhwrvlE2bDo',
                'isAdmin': 'true'
            },
            body: JSON.stringify({ _id, name, notaGame, generoGame, descGame }),
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        }, )
    }

    return (
        <GamesContext.Provider value={{ games, addGames, removeGames, changeGames, deleteGames, updatedGames, updatGames, refreshPage, UpdateGames }}>
            {children}
        </GamesContext.Provider>
    );
};
