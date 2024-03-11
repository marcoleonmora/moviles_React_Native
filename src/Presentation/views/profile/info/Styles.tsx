import { StyleSheet } from "react-native";

const ProfileInfoStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },

    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '25%',
    },

    form: {
        width: '100%',
        height: '45%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30,
    },

    formText: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    formInfo: {
        flexDirection: 'row',
        alignItems: 'center',

    },

    formContent:{
        marginLeft: 15,
    },

    formImage: {
        width: 30,
        height: 30,
    },

    formTextDescription:{
        fontSize: 13,
        color: 'gray'
    },

    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '14%',
        alignItems: 'center'
    },

    logoImage: {
        width: 180,
        height: 180,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 2
    },

    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
    },

    logout:{
        position: 'absolute',
        alignSelf: 'center',
        top: 40,
        right: 20,
    },
    
    logoutImage:{
        width: 40,
        height: 40,
       
    }

});

export default ProfileInfoStyles;