import React, { createContext, useEffect, useState } from "react";
import { User } from "../../Domain/entities/User";
import { SaveUserLocalUseCase } from "../../Domain/useCases/userLocal/SaveUserLocal";
import { GetUserLocalUseCase } from "../../Domain/useCases/userLocal/GetUserLocal";
import { RemoveUserLocalUseCase } from "../../Domain/useCases/userLocal/RemoveUserLocal";

export const UserInicialState: User = {
    id: '',
    name: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
    session_token: '',
    roles: [],
}

export interface UserContextProps {
    user: User;
    saveUserSesion: (user: User) => Promise<void>;
    getUserSesion: () => Promise<void>;
    removeUserSesion: () => Promise<void>;

}

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: any) => {

    const [user, setUser] = useState(UserInicialState);

    useEffect(() => {
        getUserSesion();
    }, [])

    const saveUserSesion = async (user: User) => {
        await SaveUserLocalUseCase(user);
        setUser(user);
    }

    const getUserSesion = async () => {
        const user = await GetUserLocalUseCase();
        setUser(user);
    }

    const removeUserSesion = async () => {
        await RemoveUserLocalUseCase();
        setUser(UserInicialState);
    }

    return (
        <UserContext.Provider value={{
            user,
            saveUserSesion,
            getUserSesion,
            removeUserSesion,
        }}>
            {children}
        </UserContext.Provider>
    )
}