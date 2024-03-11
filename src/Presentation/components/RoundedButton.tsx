import React from "react";
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MyColors } from "../theme/AppTheme";


export const RoundedButton = ({ text, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.RoundedButton}
            onPress={() => onPress()}
        >
            <Text style = {styles.textButton}>{ text }</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    RoundedButton: {
        width: '100%',
        height: 50,
        backgroundColor: MyColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    textButton: {
        color: 'white',
    }
});

// Para que el componente funcione, es necesario que el padre le pase las props que necesita.
interface Props {
    title: string;
    onPress: () => void;
}
