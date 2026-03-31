import { FlatList, Pressable, ScrollView, StyleSheet, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import ThemedText from '../../components/ThemedText'
import ThemedView from '../../components/ThemedView'
import ThemedTextInput from '../../components/ThemedTextInput'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
import { wp, hp } from '../../helpers/common'
import { Theme } from '../../constants/Theme'
import api from '../../api/api'
import avatar from '../../assets/images/avatar.png'

import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Image } from 'expo-image'
import ThemedButton from '../../components/ThemedButton'

const editPage = () => {
    const colorScheme = useColorScheme()
    const theme = Theme[colorScheme] ?? Theme.light

    const { user } = useLocalSearchParams()

    const userData = JSON.parse(user)
    console.log('USER: ', userData)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [bio, setBio] = useState()
    const [img, setImg] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const route = useRouter()
    return (
        <ScreenWrapper>
            <ThemedView style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <ThemedView style={styles.header}>

                        <Pressable onPress={() => route.back()}>
                            <Ionicons
                                name="arrow-back-outline"
                                size={26}
                                color={theme.iconColor}
                            />
                        </Pressable>
                        <ThemedText title style={styles.title}>
                            Edit Profile
                        </ThemedText>

                    </ThemedView>

                    {/*Form*/}
                    <ThemedView style={{ gap: 20 }}>
                        <ThemedView style={styles.avatarContainer}>
                            <Image style={[styles.avatar, { borderColor: theme.iconColor }]} />
                            <Pressable style={styles.cameraIcon} >
                                <Ionicons name='camera' size={26} color={theme.iconColor} />
                            </Pressable>
                        </ThemedView>

                        <ThemedText style={{ fontSize: hp(1.5), marginHorizontal: 20 }}>
                            Please login to continue
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
                                placeholder={'Enter your email'}
                                onChangeText={vlaue => setEmail(vlaue)}
                            />
                        </ThemedView>

                        <ThemedView
                            style={[{
                                borderColor: theme.iconColor,
                                backgroundColor: theme.uiBackground,
                            },
                            styles.contain]}
                        >
                            <Ionicons name='text' size={26} color={theme.iconColor} />
                            <ThemedTextInput
                                multiline={true}
                                placeholder={'bio...'}
                            />
                        </ThemedView>

                        {/*Button*/}
                        {isLoading ?
                            (<ActivityIndicator size={'large'} color={'#6849a7'} />) : (
                                <ThemedButton style={{marginStart: '20', }}
                                    onPress={() => console.log('hello')}
                                >
                                    <ThemedText style={{
                                        fontWeight: Theme.fonts.semiBold, 
                                        color: '#fff' 
                                        }}>
                                        Update
                                    </ThemedText>
                                </ThemedButton>
                            )
                        }
                    </ThemedView>
                </ScrollView>

            </ThemedView>
        </ScreenWrapper>
    )
}

export default editPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingHorizontal: wp(4)
    },
    form: {
        //backgroudColor:'red'
        // gap:10
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
        marginHorizontal: 20,
        gap: 12
    },
    avatarContainer: {
        height: hp(14),
        width: hp(14),
        alignSelf: 'center'
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: Theme.radius.xxl * 100,
        borderCurve: 'countinuous',
        borderWidth: 1,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        end: -4,
        padding: 3,
        borderRadius: 50,
        //backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        //justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 30,
        marginHorizontal: wp(4),
        gap: 20
    },
    title: {
        fontSize: hp(3.2),
        fontWeight: Theme.fonts.bold
    },
    bio: {
        height: hp(15),
        backgroundColor: 'red'
    }
})