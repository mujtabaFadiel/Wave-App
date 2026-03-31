import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Theme } from '../constants/Theme'


const ThemedCard = ({ style, ...props }) => {
    const colorScheme = useColorScheme()
    const theme = Theme[colorScheme] ?? Theme.light

  return (
    <View 
        style={[{backgroundColor: theme.uiBackground}, styles.card, style]}
        {...props}
    />
  )
}

export default ThemedCard

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        padding: 20,
        marginHorizontal: 10,
        marginVertical: 10
    }
})