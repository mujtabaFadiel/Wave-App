import React from 'react'
import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Theme } from '../constants/Theme'

const ScreenWrapper = ({  style, ...props }) => {
    const colorScheme = useColorScheme()
    const theme = Theme[colorScheme] ?? Theme.light

    const { top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 5 : 15

    return (
        <View style={[{ 
            flex: 1, 
            paddingTop: paddingTop,
            backgroundColor: theme.background
        }, style]}
            {...props}
        />
    )
}

export default ScreenWrapper

const styles = StyleSheet.create({})