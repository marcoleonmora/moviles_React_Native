/**
 * Class AuthRepositoryImpl
 * ? Implements AuthRepository
 * @param {User} user - User to register
 * @returns {Promise<ResponseApiDelivery>} - Response of the API
 * 
 */

import { AxiosError } from "axios";
import { User } from "../../Domain/entities/User";
import { AuthRepository } from "../../Domain/repositories/AuthRepository";
import { ApiDelivery, ApiDeliveryForImage } from "../sources/remote/api/ApiDelivery";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";
import mime from 'mime';
import { ImageInfo } from "expo-image-picker";

export class AuthRepositoryImpl implements AuthRepository {

    async register(user: User): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.post<ResponseApiDelivery>('/users/create', user);
            return Promise.resolve(response.data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('error' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }

    async registerWithImage(user: User, file: ImageInfo ): Promise<ResponseApiDelivery> {
        try {
            let data = new FormData();
            data.append('image', { //'image' is the same name of the field in the API routes
                // @ts-ignore
                uri: file.uri,
                name: file.uri.split('/').pop(),
                type: mime.getType(file.uri)!
            } as any);

            data.append('user', JSON.stringify(user)); //'user' is the same name of the field in the API routes

            const response = await ApiDeliveryForImage.post<ResponseApiDelivery>('/users/createWithImage', data);
            // '/users/createWithImage' is the route in the API

            return Promise.resolve(response.data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('error' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }

    async login(email: string, password: string): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.post<ResponseApiDelivery>('/users/login', {
                email: email,
                password: password
            });
            return Promise.resolve(response.data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('error' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }
} 