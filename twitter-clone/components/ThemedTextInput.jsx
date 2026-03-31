import { Dimensions, TextInput, useColorScheme } from 'react-native'
import React from 'react'
import { Theme } from '../constants/Theme'

const ThemedTextInput = ({style, ...props}) => {
    const colorScheme = useColorScheme()
    const theme = Theme[colorScheme] ?? Theme.light
    const {width} = Dimensions.get('window')

    return (
        <TextInput
            style={[{
                //width: width * 0.9, 
                //backgroundColor: theme.uiBackground,
                color: theme.text,
                //padding: 20,
                borderRadius: 6
            },
            style
        ]}
        placeholderTextColor={theme.iconColor}
        {...props}
        />
    )
}

export default ThemedTextInput