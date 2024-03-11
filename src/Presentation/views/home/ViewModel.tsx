import React, { useEffect, useState, useContext } from 'react'
import { LoginAuthUseCase } from '../../../Domain/useCases/auth/LoginAuth';
//import { SaveUserUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';

import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { GetUserLocalUseCase } from '../../../Domain/useCases/userLocal/GetUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';
import { UserContext } from '../../context/UserContext';

const HomeViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState(
        {
            email: '',
            password: ''
        }
    );

    //const { user, getUserSession } = useUserLocal();
    const { user, saveUserSesion} = useContext(UserContext);

    console.log('Usuario en sesión: ' + JSON.stringify(user));
        /*
    useEffect(() => { //Se ejecuta cuando se instancia el viewModel
        getUserSession();
    }, []);        
        
    const getUserSession = async () => {
        const user = await GetUserLocalUseCase();
        console.log('Usuario Sesion: ' + JSON.stringify(user));
    }
*/

    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value});
    }

    const login = async () => {
        if (isValidForm()) {
            const response = await LoginAuthUseCase(values.email, values.password);
            console.log('Respuesta: ' + JSON.stringify(response));
            if(!response.success) {
                setErrorMessage(response.message);
            }
            else {
                saveUserSesion(response.data);
            }
        }
    };

    const isValidForm = () => {
        if (values.email === '') {
            setErrorMessage('El email es requerido');
            return false;
        }
        if (values.password === '') {
            setErrorMessage('La contraseña es requerida');
            return false;
        }
        return true;
    }

    return {
        ...values,
        user,
        onChange,
        login,
        errorMessage
    }
}

export default HomeViewModel; 

