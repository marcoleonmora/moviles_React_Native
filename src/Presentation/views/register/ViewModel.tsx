/**
 * View model for the register view
 * It handles the logic of the view and the state of the input values
 * values: State variable to handle the input values
 * setValues: Function to update the state values
 * onChange: Function to handle the change of the input values
 * register: Function to handle the register of the user
 * @returns {Object} - Object with the values and functions to handle the view
 */

import  { useState } from "react"
//import { ApiDelivery } from "../../../Data/sources/remote/api/ApiDelivery";
//import { RegisterAuthUseCase } from "../../../Domain/useCases/auth/RegisterAuth";
import * as ImagePicker from "expo-image-picker";
import { RegisterWithImageAuthUseCase } from "../../../Domain/useCases/auth/RegisterWithImageAuth";
import { SaveUserLocalUseCase } from "../../../Domain/useCases/userLocal/SaveUserLocal";
import { useUserLocal } from "../../hooks/useUserLocal"

const RegisterViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        image: '',
        password: '',
        confirmPassword: ''
    });

    const [loading, setloading] = useState(false);

    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
    const { user, getUserSession } = useUserLocal();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            onChange('image', result.assets[0].uri);
            setFile(result.assets[0]);
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            onChange('image', result.assets[0].uri);
            setFile(result.assets[0]);
        }
    };


    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const register = async () => {
        if (isValidForm()) {
            setloading(true);
            const response = await RegisterWithImageAuthUseCase(values, file!);
            setloading(false);
            console.log('Result' + JSON.stringify(response));

            if(response.success){
                await SaveUserLocalUseCase(response.data);
                getUserSession();
            }
            else{
                setErrorMessage(response.message);
            }
        }
        else {  //Agregado para depuracion
            console.log('Formulario no valido'); 
        }
    }

    const isValidForm = (): boolean => {
        if (values.name === '') {
            setErrorMessage('El nombre es requerido');
            return false;
        }
        if (values.lastname === '') {
            setErrorMessage('El apellido es requerido');
            return false;
        }
        if (values.email === '') {
            setErrorMessage('El correo es requerido');
            return false;
        }
        if (values.phone === '') {
            setErrorMessage('El teléfono es requerido');
            return false;
        }
        if (values.password === '') {
            setErrorMessage('La contraseña es requerida');
            return false;
        }
        if (values.confirmPassword === '') {
            setErrorMessage('La confirmación de contraseña es requerida');
            return false;
        }
        if (values.password !== values.confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return false;
        }
        if (values.image === '') {
            setErrorMessage('Seleccione una imagen de perfil');
            return false;
        }
        return true;
    }

    return {
        ...values,
        onChange,
        register,
        pickImage,
        takePhoto,
        errorMessage,
        loading,
        user
    }
}

export default RegisterViewModel;

