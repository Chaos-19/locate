// components/SearchBar.js
import { StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';


export default function ({ input, onChangeInput }) {

    return (

        <View style={styles.container}>
            <View style={styles.wrapp}>
                <Entypo name="location-pin" size={32} color="red" />
                <TextInput
                    style={styles.input}
                    placeholder='Search here'
                    value={input}
                    onChangeText={onChangeInput}
                />
                {input ? <AntDesign name="search1" size={24} color="black" /> : <FontAwesome name="microphone" size={32} color="blue" />}
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        height: 60,
        width: "100%",
        marginTop: 50,
        paddingHorizontal: 20,
        paddingVertical: 10,

    },
    wrapp: {
        paddingStart: 10,
        flexDirection: "row",
        width: "100%",
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderBlockColor: "red"
    },
    input: {
        flexGrow: 2,
        height: "100%",
        paddingVertical: 10,
        fontSize: 20
    },

})
