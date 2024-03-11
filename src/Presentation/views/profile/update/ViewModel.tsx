import  { useState, useContext } from "react"
//import { ApiDelivery } from "../../../Data/sources/remote/api/ApiDelivery";
//import { RegisterAuthUseCase } from "../../../Domain/useCases/auth/RegisterAuth";
import * as ImagePicker from "expo-image-picker";
//import { RegisterWithImageAuthUseCase } from "../../../../Domain/useCases/auth/RegisterWithImageAuth";
import { SaveUserLocalUseCase } from "../../../../Domain/useCases/userLocal/SaveUserLocal";
import { useUserLocal } from "../../../hooks/useUserLocal"
import { RegisterWithImageAuthUseCase } from "../../../../Domain/useCases/auth/RegisterWithImageAuth";
import { UpdateUserUseCase } from "../../../../Domain/useCases/user/UpdateUser";
import { UpdateWithImageUserUseCase } from "../../../../Domain/useCases/user/UpdateWithImageUser";
import { User } from "../../../../Domain/entities/User";
import { ResponseApiDelivery } from "../../../../Data/sources/remote/models/ResponseApiDelivery";
import { UserContext } from "../../../context/UserContext";


const ProfileUpdateViewModel = (user: User) => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState(user);
    const [loading, setloading] = useState(false);
    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
    const { getUserSession } = useUserLocal();
    const { saveUserSesion} = useContext(UserContext);

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

    const onChangeInfoUpdate = (name: string, lastname: string, phone: string) => {
        setValues({ ...values, name, lastname, phone });
    }

    const update = async () => {
        if (isValidForm()) {
            setloading(true);

            let response = {} as ResponseApiDelivery
            if (values.image?.includes('https://')) {
                response = await UpdateUserUseCase(values); 
            }
            else{
                response = await UpdateWithImageUserUseCase(values, file!);
            }
            
            setloading(false);
            console.log('Result' + JSON.stringify(response));

            if(response.success){
                saveUserSesion(response.data);
                setSuccessMessage(response.message); //Agregado para mensaje al usuario
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

        if (values.phone === '') {
            setErrorMessage('El teléfono es requerido');
            return false;
        }

        return true;
    }

    return {
        ...values,
        onChange,
        update,
        pickImage,
        takePhoto,
        onChangeInfoUpdate,
        errorMessage,
        successMessage, //Agregado para mensaje al usuario
        loading,
        user
    }
}

export default ProfileUpdateViewModel;

