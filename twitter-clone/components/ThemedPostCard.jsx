import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemedView from './ThemedView'
import { Image } from 'expo-image'
import avatar from '../assets/images/avatar.jpeg'
import ThemedText from './ThemedText'
import { Ionicons } from '@expo/vector-icons'
import { hp, wp } from '../helpers/common'
import { Theme } from '../constants/Theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../api/api'
import { router } from 'expo-router'
import ModalCard from './ModalCard'
import ThemedTextInput from './ThemedTextInput'
import { FlatList } from 'react-native'

const ThemedPostCard = ({
    username,
    content,
    time,
    deleteTweet,
    selfDelete,
    id,
    tweet,
    userId,
    handleLike,
    isLiked,
    selectedTweet,
    onCommentPres,
    createComment
}) => {

    const colorScheme = useColorScheme()
    const theme = Theme[colorScheme] ?? Theme.dark

    const [click, setClick] = useState(false)
    const [visible, setVisible] = useState(false)
    const [likePost, setLikePost] = useState(false)
    const [comment, setComment] = useState('')
    const [isFollowing, setIsFollowing] = useState()


    const checkFollowing = async () => {
        const token = await AsyncStorage.getItem("accessToken")
        try {
            const response = await api.get(`follows/isFollowing`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const followListData = response.data;
            console.log('followingList Raw:', followListData)

            const followedUserIds = followListData
                .filter(f => f.isFollowing === true)
                .map(f => f.id)

            setIsFollowing(followedUserIds);

        } catch (error) {
            console.log("STATUS:", error.response?.status)
            console.log("DATA:", error.response?.data)
            console.log("MSG:", error.message)
        }
    }

    const followUser = async (id) => {
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

    const dotsBtn = () => {
        setClick(!click)
        checkFollowing()
    }

    const follow = (id) => {
        followUser(id)
    }

    const getLikes = async (tweetId) => {
        const token = await AsyncStorage.getItem("accessToken")

    }

    const likeTweet = async (tweetId) => {
        const token = await AsyncStorage.getItem("accessToken")

        getLikes(tweetId)
        try {
            await api.post(`like/${tweetId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
        } catch (error) {
            console.log("STATUS:", error.response?.status)
            console.log("DATA:", error.response?.data)
            console.log("MSG:", error.message)

        }

    }
    const liked = async (tweet) => {
        likeTweet(tweet.id)
        await handleLike(tweet.id)
    }

    const openPostDetails = () => {
        router.push({
            pathname: 'PostDetails',
            params: { tweetId: tweet.id }
        })
    }

    return (
        <ThemedView style={[styles.container, { borderColor: theme.uiBackground }]}>
            <ThemedView style={styles.header}>
                <ThemedView style={styles.userInfo}>
                    <ThemedView style={{ borderRadius: Theme.radius.xxl * 100 }}>
                        <Image
                            source={avatar}
                            style={{
                                width: hp(4.5),
                                height: hp(4.5),
                                borderRadius: Theme.radius.xxl * 100
                            }}
                        />
                    </ThemedView>

                    <ThemedView style={{ gap: 2 }}>
                        <ThemedText style={styles.username} title>
                            {username}
                        </ThemedText>
                        <ThemedText style={styles.postTime}>
                            {time}
                        </ThemedText>
                    </ThemedView>
                </ThemedView>

                <TouchableOpacity onPress={dotsBtn}>
                    <Ionicons
                        name="ellipsis-horizontal-outline"
                        size={hp(3.4)}
                        color={theme.iconColor}
                    />
                </TouchableOpacity>
                {!click ? null : (
                    <ThemedView
                        style={
                            [styles.dots, { backgroundColor: theme.uiBackground }]}
                    >
                        <Pressable
                            onPress={() => follow(id)}
                        >
                            <ThemedText style={{ fontSize: 13, color: Theme.primary }}>
                                <Ionicons name="add" size={24} color={theme.iconColor} />
                            </ThemedText>
                        </Pressable>
                        {selfDelete &&
                            <Pressable onPress={deleteTweet}>
                                <ThemedText
                                    style={{ fontSize: 13, color: 'red' }}>
                                    delete
                                </ThemedText>
                            </Pressable>
                        }
                    </ThemedView>
                )}
            </ThemedView>

            {/*Post body & media*/}

            <ThemedView style={styles.containt}>
                <ThemedView style={styles.postBody}>
                    <ThemedText>{content}</ThemedText>
                </ThemedView>
            </ThemedView>

            {/*like & comment */}

            <ThemedView style={styles.footer}>
                <ThemedView style={styles.footerBtn}>
                    <TouchableOpacity onPress={() => handleLike(tweet.id)}>
                        <Ionicons
                            name={isLiked ? 'heart' : 'heart-outline'}
                            size={24}
                            color={isLiked ? '#F00' : theme.iconColor}
                        />
                    </TouchableOpacity>
                    <ThemedText style={styles.count}>
                        {
                            tweet.likes.length ? tweet.likes.length : ""
                        }
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.footerBtn}>
                    <TouchableOpacity onPress={() => {
                        onCommentPres()
                        setVisible(true)
                    }}>
                        <Ionicons name='chatbubble-outline' size={24} color={theme.iconColor} />
                    </TouchableOpacity>
                    <ThemedText style={styles.count}>
                        {
                            tweet.comments.length ? tweet.comments.length : ""
                        }
                    </ThemedText>
                </ThemedView>
            </ThemedView>

            <Modal
                visible={visible}
                animationType='slide'
                transparent={true}
            >

                <Pressable style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}

                    onPress={() => setVisible(false)}
                />

                <ThemedView style={{
                    height: '70%',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    overflow: 'hidden'
                }}>

                    <ThemedView style={{
                        width: 40, height: 5, borderRadius: 3,
                        backgroundColor: '#ccc', alignSelf: 'center', marginVertical: 10
                    }} />

                    <ThemedView style={{ padding: 15, borderBottomWidth: 0.5, borderColor: '#333' }}>
                        <ThemedText style={{ fontWeight: 'bold', fontSize: 16 }}>
                            {selectedTweet?.user?.username}
                        </ThemedText>
                        <ThemedText style={{ marginTop: 5, opacity: 0.9 }}>
                            {selectedTweet?.content}
                        </ThemedText>
                    </ThemedView>

                    <FlatList
                        data={selectedTweet?.comments}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ padding: 15, paddingBottom: 100 }}
                        renderItem={({ item }) => (
                            <ThemedView style={{ marginBottom: 15, gap: 2 }}>
                                <ThemedText style={{ fontWeight: 'bold', fontSize: 14 }}>
                                    @{item.user?.username}
                                </ThemedText>
                                <ThemedText style={{ opacity: 0.8 }}>
                                    {item.content}
                                </ThemedText>
                            </ThemedView>
                        )}
                    />

                    <ThemedView style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        padding: 15, paddingBottom: 30, // مسافة إضافية للآيفون
                        borderTopWidth: 0.5, borderColor: '#333',
                        backgroundColor: theme.uiBackground, // الحفاظ على لونك
                        flexDirection: 'row', alignItems: 'center', gap: 10
                    }}>
                        <ThemedView style={{ flex: 1 }}>
                            <ThemedTextInput
                                placeholder='Write a comment...'
                                onChangeText={(value) => setComment(value)}
                                style={{ borderRadius: 20, paddingHorizontal: 15, height: 45 }}
                            />
                        </ThemedView>

                        <TouchableOpacity
                            onPress={() => {
                                createComment(tweet.id, comment)
                                setVisible(false)
                            }}
                            style={{ paddingHorizontal: 10 }}
                        >
                            <ThemedText style={{ fontWeight: 'bold', color: Theme.primary }}>Send</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>

                </ThemedView>
            </Modal>

        </ThemedView>
    )
}

export default ThemedPostCard

const styles = StyleSheet.create({
    container: {
        gap: 10,
        marginBottom: 15,
        borderRadius: Theme.radius.xxl,
        borderCurve: 'continuous',
        padding: 10
        , paddingVertical: 12,
        //backgroundColor:'white',
        borderWidth: 1.5,
        marginHorizontal: wp(4)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    username: {
        fontSize: hp(1.7),
        fontWeight: Theme.fonts.medium
    },
    content: {
        gap: 18
    },
    postMedia: {
        height: hp(40),
        width: '100%',
        borderRadius: Theme.radius.xl,
        borderCurve: 'continuous'
    },
    postTime: {
        fontSize: hp(1.4),
        fontWeight: Theme.fonts.medium
    },
    postBody: {
        marginStart: 5
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    footerBtn: {
        marginStart: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18
    },
    count: {
        fontSize: hp(1.8)
    },
    dots: {
        position: 'absolute',
        backgroundColor: Theme.primary,
        width: 80,
        start: 220,
        //end: 100,
        top: 0,
        justifyContent: 'center',
        paddingStart: 5,
        borderRadius: 7,
        paddingTop: 2,
        paddingBottom: 5,
        gap: 6
    }
})