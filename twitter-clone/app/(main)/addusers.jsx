import { StyleSheet, Image, FlatList, Pressable, useColorScheme, View } from 'react-native'

import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import ThemedText from '../../components/ThemedText'
import ThemedView from '../../components/ThemedView'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
import { wp, hp } from '../../helpers/common'
import { Theme } from '../../constants/Theme'
import api from '../../api/api'
import avatar from '../../assets/images/avatar.jpeg'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import { useRouter } from 'expo-router'
import ThemedPostCard from '../../components/ThemedPostCard'
import ThemedCard from '../../components/ThemedCard'
import { useLocalSearchParams } from 'expo-router';

const addusers = () => {
    const colorScheme = useColorScheme()
    const theme = Theme[colorScheme] ?? Theme.dark

    const { userId } = useLocalSearchParams()
    const route = useRouter()

    const [addusers, setAddUsers] = useState()

    const getUsers = async () => {

        try {
            const accessToken = await AsyncStorage.getItem('accessToken')

            const res = await api.get('users', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            const usersList = res.data

            const newUsersList = usersList.filter(u => u.id != userId)

            setAddUsers(newUsersList)

        } catch (error) {
            console.log("STATUS:", error.response?.status)
            console.log("DATA:", error.response?.data)
            console.log("MSG:", error.message)
        }
    }

    const handleFollow = async (id) => {
        const token = await AsyncStorage.getItem("accessToken")

        try {
            await api.post(`follows/${id}`,
                {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log("STATUS:", error.response?.status)
            console.log("DATA:", error.response?.data)
            console.log("MSG:", error.message)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])
    return (
        <ScreenWrapper>

            <ThemedView style={styles.container}>

                {/* Header */}
                <ThemedView style={styles.header}>
                    <Pressable onPress={() => route.back()}>
                        <Ionicons name="arrow-back-outline" size={26} color={theme.iconColor} />
                    </Pressable>
                    <ThemedText title style={styles.title}>Follow</ThemedText>

                    <ThemedView style={{ flexDirection: 'row', gap: 8 }}>
                        <Pressable>
                            <Image
                                source={avatar}
                                style={[styles.avatar, { borderColor: theme.iconColor }]}
                            />
                        </Pressable>
                    </ThemedView>

                </ThemedView>

                {
                    addusers && addusers.map(user => (
                        <ThemedCard key={user.id}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <ThemedText>{user.username}</ThemedText>
                                <Pressable onPress={() => handleFollow(user.id)}>
                                    <Ionicons
                                        name="person-add"
                                        size={26}
                                        color={theme.iconColor}
                                    />
                                </Pressable>
                            </View>
                        </ThemedCard>
                    ))
                }

            </ThemedView>
        </ScreenWrapper>
    )
}

export default addusers

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    avatar: {
        width: hp(3.5),
        height: hp(3.5),
        borderRadius: Theme.radius.xxl * 100,
        borderCurve: 'countinuous',
        borderWidth: 1,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: wp(4)
    },

    title: {
        fontSize: hp(3.2),
        fontWeight: Theme.fonts.bold
    },
    tweetCard: {
        flexDirection: 'row',
        gap: 10,
        padding: 12,
        borderBottomWidth: 0.5
    },

    tweet: {
        padding: 15,
        borderBottomWidth: 0.5
    },

    username: {
        fontWeight: 'bold'
    },

    time: {
        fontSize: 12,
        color: 'gray'
    }
})