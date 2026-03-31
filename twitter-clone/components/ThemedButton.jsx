import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Theme } from '../constants/Theme'

const {width} = Dimensions.get('window')

const ThemedButton = ({style, onPress, ...props}) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.btn, pressed && styles.pressed,
            style]}
            {...props}
        />
    )
}

export default ThemedButton

const styles = StyleSheet.create({
    btn: {
        width: width * 0.9,
        backgroundColor: Theme.primary,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 5
    },
    pressed: {
        opacity: 0.8
    }
})