import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, Text, Button, Image, Touchable, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../../../../App';
import useViewModel from './ViewModel';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import { RoundedButton } from '../../../components/RoundedButton';

export const ProfileInfoScreen = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { user, removeUserSesion } = useViewModel();

    useEffect(() => {
        if (user.id === ''){
            navigation.replace('HomeScreen');
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../../assets/chef.jpg')}
                style={styles.imageBackground}
            />
            <TouchableOpacity
                style={ styles.logout}
                onPress={() => {
                    removeUserSesion();
                    
                }}>
                <Image
                    source={require('../../../../../assets/shutdown.png')}
                    style={styles.logoutImage}
                />
            </TouchableOpacity>
            
            <View style={styles.logoContainer}>
                {
                    user?.image !== '' 
                    &&
                    <Image
                        source={{ uri: user?.image }}
                        style={styles.logoImage}
                    /> 
                }
            </View>
            
            <View style={styles.form}>
                <View style={styles.formInfo}>
                    <Image
                        source={require('../../../../../assets/user.png')}
                        style={styles.formImage}
                    />
                    <View style={styles.formContent}>
                        <Text>{user?.name} {user?.lastname}</Text>
                        <Text style={styles.formTextDescription}>Nombre del usuario</Text>
                    </View>
                </View>

                <View style={{ ...styles.formInfo, marginTop: 25 }}>
                    <Image
                        source={require('../../../../../assets/email.png')}
                        style={styles.formImage}
                    />
                    <View style={styles.formContent}>
                        <Text>{user?.email}</Text>
                        <Text style={styles.formTextDescription}>Correo electrónico</Text>
                    </View>
                </View>

                <View style={{ ...styles.formInfo, marginTop: 25, marginBottom: 40 }}>
                    <Image
                        source={require('../../../../../assets/phone.png')}
                        style={styles.formImage}
                    />
                    <View style={styles.formContent}>
                        <Text>{user?.phone}</Text>
                        <Text style={styles.formTextDescription}>Teléfono</Text>
                    </View>
                </View>
                <RoundedButton
                    onPress={() => {
                        navigation.navigate('ProfileUpdateScreen', { user: user! });
                     }
                    }
                    text={'ACTUALIZAR INFORMACION'}
                />

            </View>
        </View>
    )
}

