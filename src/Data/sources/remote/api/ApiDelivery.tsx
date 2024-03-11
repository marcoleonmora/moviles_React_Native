/**
 * Create a new instance of axios with a custom config
 * Crea una nueva instancia de axios con una configuración personalizada
 * de la url del servidor y el tipo de contenido
 */

import axios from 'axios';
import { LocalStorage } from '../../local/LocalStorage';
import { User } from '../../../../Domain/entities/User';

const ApiDelivery = axios.create({
    //baseURL: 'http://192.168.0.4:3000/api',
    baseURL: 'http://192.168.0.4:3000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});


const ApiDeliveryForImage = axios.create({
    baseURL: 'http://192.168.0.4:3000/api',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    }
});

//INTERCEPTORES: Se ejecutan antes de que la petición sea enviada al servidor

ApiDelivery.interceptors.request.use(
    async (config) => {
        const data = await LocalStorage().getItem('user');
        if (data){
            const user: User = JSON.parse(data as any);
            config.headers!['Authorization'] = user?.session_token;
            //Si la anterior linea no funciona, probar con una de las siguientes
            // (config.headers as AxiosHeaders).set('Authorization'), `${user?.session_token!}`);
            // config.headers.set('Authorization', `${user?.session_token!}`);
        }
        return config;
    }
);

ApiDeliveryForImage.interceptors.request.use(
    async (config) => {
        const data = await LocalStorage().getItem('user');
        if (data){
            const user: User = JSON.parse(data as any);
            config.headers!['Authorization'] = user?.session_token;
        }
        return config;
    }
);

export { ApiDelivery, ApiDeliveryForImage}
