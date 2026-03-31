import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import ThemedText from '../../components/ThemedText'
import ThemedView from '../../components/ThemedView'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import { Ionicons } from '@expo/vector-icons'
import { wp, hp } from '../../helpers/common'
import { Theme } from '../../constants/Theme'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import api from '../../api/api'

const SignUp = () => {
    const colorScheme = useColorScheme()
    const theme = Theme[colorScheme] ?? Theme.light

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const submit = async () => {
        if(email.trim() == "" || password.trim() == "" || username.trim() == "")
            return
        try {
            const res = api.post('users/register', {
                username: username,
                email: email,
                password: password
            })
            router.push('login')

        } catch (error) {
            console.log("STATUS:", error.response?.status)
            console.log("DATA:", error.response?.data)
            console.log("MSG:", error.message)
        }
    }

    return (
        <ScreenWrapper>
            <StatusBar style="dark" />
            <ThemedView style={styles.container}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons color={theme.iconColor} name='arrow-back' size={24} />
                </Pressable>

                {/* Welcome */}
                <ThemedView>
                    <ThemedText title style={styles.welcomeTxt}>Let's,</ThemedText>
                    <ThemedText title style={styles.welcomeTxt}>Get Started</ThemedText>
                </ThemedView>

                {/*Form*/}
                <ThemedView style={{ gap: 20 }}>
                    <ThemedText style={{ fontSize: hp(1.5) }}>
                        Please fill the details to create an account
                    </ThemedText>

                    <ThemedView
                        style={[{
                            borderColor: theme.iconColor,
                            backgroundColor: theme.uiBackground
                        },
                        styles.contain]}
                    >
                        <Ionicons name='person-outline' size={26} color={theme.iconColor} />
                        <ThemedTextInput
                            placeholder={'Enter your name'}
                            onChangeText={vlaue => setUsername(vlaue)}
                        />
                    </ThemedView>

                    <ThemedView
                        style={[{
                            borderColor: theme.iconColor,
                            backgroundColor: theme.uiBackground
                        },
                        styles.contain]}
                    >
                        <Ionicons name='mail-outline' size={26} color={theme.iconColor} />
                        <ThemedTextInput
                            placeholder={'Enter your email'}
                            onChangeText={vlaue => setEmail(vlaue)}
                        />
                    </ThemedView>

                    <ThemedView
                        style={[{
                            borderColor: theme.iconColor,
                            backgroundColor: theme.uiBackground
                        },
                        styles.contain]}
                    >
                        <Ionicons name='lock-closed-outline' size={26} color={theme.iconColor} />
                        <ThemedTextInput
                            placeholder={'Enter your password'}
                            secureTextEntry={true}
                            onChangeText={vlaue => setPassword(vlaue)}
                        />
                    </ThemedView>

                    {/*Button*/}
                    <ThemedButton onPress={submit}>
                        <ThemedText style={{ fontWeight: Theme.fonts.semiBold, color: '#fff' }}>
                            sign up
                        </ThemedText>
                    </ThemedButton>
                </ThemedView>

                {/*Footer*/}
                <ThemedView style={styles.footer}>
                    <ThemedText style={styles.footerTxt}>
                        Already have an Account?
                    </ThemedText>
                    <Pressable onPress={() => router.push('login')}>
                        <ThemedText
                            style={[
                                styles.footerTxt,
                                { color: Theme.primary, fontWeight: Theme.fonts.semiBold }
                            ]}>
                            Login
                        </ThemedText>
                    </Pressable>

                </ThemedView>

            </ThemedView>
        </ScreenWrapper>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1
        , gap: 45,
        paddingHorizontal: wp(5)
    }
    , welcomeTxt: {
        fontSize: hp(4),
        fontWeight: Theme.fonts.bold
    },
    contain: {
        flexDirection: 'row',
        height: hp(7.2),
        alignItems: 'center',
        //justifyContent: 'center',
        borderWidth: 0.4,
        borderRadius: Theme.radius.sm,
        borderCurve: 'continuous',
        paddingHorizontal: 18,
        gap: 12
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    footerTxt: {
        textAlign: 'center',
        fontSize: hp(1.6)
    }
})