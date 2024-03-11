import React, { useContext} from 'react'
import { RemoveUserLocalUseCase } from '../../../../Domain/useCases/userLocal/RemoveUserLocal';
import { UserContext } from '../../../context/UserContext';

const ProfileInfoViewModel = () => {

  const { user, removeUserSesion } = useContext( UserContext);
  
  return {
    removeUserSesion,
    user
  }
}

export default ProfileInfoViewModel;

