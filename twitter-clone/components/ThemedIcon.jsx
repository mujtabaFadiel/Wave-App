import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Theme } from '../constants/Theme'
import ThemedView from './ThemedView'


const ThemedIcon = ({ style, name, size = 26, color = theme.iconColor, ...props }) => {
    const colorScheme = useColorScheme()
    const theme = Theme[colorScheme] ?? Theme.light
    return (
        <ThemedView
            style={[{
                borderColor: theme.iconColor,
                backgroundColor: theme.uiBackground
            },
            styles.contain]}
        >
            <Ionicons name={name} size={size} color={color} />
        </ThemedView>
    )
}

export default ThemedIcon

const styles = StyleSheet.create({
    contain: {
        flexDirection: 'row',
        height: hp(7.2),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.4,
        borderRadius: Theme.radius.sm,
        borderCurve: 'continuous',
        paddingHorizontal: 18,
        gap: 12
    },
})