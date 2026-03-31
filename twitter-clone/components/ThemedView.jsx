import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Theme } from '../constants/Theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ThemedView = ({ style, safe = false, ...props }) => {
    const colorScheme = useColorScheme()
    const theme = Theme[colorScheme] ?? Colors.Theme

  if(!safe) return (
    <View 
        style={[{backgroundColor: theme.background}, style]}
        {...props}
    />)

    const insets = useSafeAreaInsets()

  return (
    <View 
        style={[{
          backgroundColor: theme.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom
        }, style]}
        {...props}
    />)
}

export default ThemedView

const styles = StyleSheet.create({})