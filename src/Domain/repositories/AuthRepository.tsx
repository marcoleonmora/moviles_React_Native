/**
 * @interface AuthRepository
 * To define the methods that the AuthRepository must implement
 * @param {User} user - User to register
 * @returns {Promise<ResponseApiDelivery>} - Response of the API
 * 
 */

import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { User } from "../entities/User";
import * as ImagePicker from 'expo-image-picker';

export interface AuthRepository {
    login(email: string, password: string ): Promise<ResponseApiDelivery>;
    register(user: User): Promise<ResponseApiDelivery>;
    registerWithImage(user: User, file: ImagePicker.ImageInfo): Promise<ResponseApiDelivery>;

}
