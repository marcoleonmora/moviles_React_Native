/**
 * This use case is responsible for registering a new user
 * @param {User} user - User object with the data to register
 * @returns {Promise} - Promise with the result of the register
 * @throws {Error} - Throws an error if something goes wrong
 *
 */

import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";
import { User } from "../../entities/User";
import * as ImagePicker from 'expo-image-picker';
const { registerWithImage} = new AuthRepositoryImpl();

export const RegisterWithImageAuthUseCase = async (user: User, file: ImagePicker.ImageInfo) =>{
    return await registerWithImage(user, file);
}