import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { RoundedButton } from './RoundedButton';

interface Props {
    openGallery: () => void,
    openCamera: () => void,
    modalUseState: boolean,
    setModalUseState: React.Dispatch<React.SetStateAction<boolean>>,
}

const ModalPickImage = ({ openGallery, openCamera, setModalUseState, modalUseState }: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalUseState}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalUseState(!modalUseState);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Seleccione una opción</Text>
                        <View style={styles.buttonContainer}>
                            <RoundedButton
                                onPress={() => {
                                    openGallery()
                                    setModalUseState(false)
                                }}
                                text={'Galería'}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <RoundedButton
                                onPress={() => {
                                    openCamera()
                                    setModalUseState(false)}}
                                text={'Cámara'}
                            />
                        </View>


                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: 250,
        height: 200,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 25,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    buttonContainer: {
        width: '100%',
        marginTop: 8,
    },
});

export default ModalPickImage


//<View style ={ styles.buttonContainer}>

