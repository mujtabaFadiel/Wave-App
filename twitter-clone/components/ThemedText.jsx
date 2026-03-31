import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Theme } from '../constants/Theme'

const ThemedText = ({ style, title = false, ...props }) => {
    const colorScheme = useColorScheme()
    const theme = Theme[colorScheme] ?? Theme.light

    const textColor = title ? theme.title : theme.text

  return (
    <Text style={[ {color: textColor} ,style]}
        {...props}
    />
  )
}

export default ThemedText

const styles = StyleSheet.create({})