import { FlatList, Pressable, StyleSheet, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import ThemedText from '../../components/ThemedText'
import ThemedView from '../../components/ThemedView'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
import { wp, hp } from '../../helpers/common'
import { Theme } from '../../constants/Theme'
import api from '../../api/api'

import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import { useRouter } from 'expo-router'
import ThemedPostCard from '../../components/ThemedPostCard'


dayjs.extend(relativeTime)

const home = () => {
  const colorScheme = useColorScheme()
  const theme = Theme[colorScheme] ?? Theme.dark

  const route = useRouter()

  const [user, setUser] = useState(null)
  const [tweets, setTweets] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [existToken, setExistToken] = useState(false)
  const [selfDelete, setSelfDelete] = useState(false)
  const [selectedTweet, setSelectedTweet] = useState(null)
  const [comment, setComment] = useState('')


  const currentUser = async () => {
    const token = await AsyncStorage.getItem('accessToken')

    try {
      const res = await api.get('auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUser(res.data)
    } catch (error) {
      console.log("STATUS:", error.response?.status)
      console.log("DATA:", error.response?.data)
      console.log("MSG:", error.message)

    }
  }

  const handleToggleFollow = async () => {
    const token = await AsyncStorage.getItem('accessToken')

    try {
      const res = await api.get('follows/isFollowing', {
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

  const getTweets = async () => {

    try {
      const accessToken = await AsyncStorage.getItem('accessToken')

      // const res = await api.get('tweet', {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`
      //   }
      // })

      const feedResponse = await api.get('feed', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (feedResponse.data && feedResponse.data.length > 0) {
        setTweets(feedResponse.data)
      } else {
        const globalResponse = await api.get('tweet', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        setTweets(globalResponse.data)
      }

      setExistToken(true)

    } catch (error) {
      console.log("STATUS:", error.response?.status)
      console.log("DATA:", error.response?.data)
      console.log("MSG:", error.message)
    }
  }

  const handleLike = async (tweetId) => {
    const token = await AsyncStorage.getItem("accessToken")

    try {
      await api.post(`like/${tweetId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      getTweets()

    } catch (error) {
      console.log("STATUS:", error.response?.status)
      console.log("DATA:", error.response?.data)
      console.log("MSG:", error.message)
    }

  }

  const onRefresh = async () => {
    setRefreshing(true)
    await getTweets()
    setRefreshing(false)
  }

  // const isLogutout = () => {

  //   if (existToken) {
  //     const interval = setInterval(() => {
  //       getTweets()
  //     }, 5000)
  //   }
  // }

  useEffect(() => {
    getTweets()
    currentUser()

    // const interval = setInterval(() => {
    //   getTweets()
    // }, 5000)

    // return () => clearInterval(interval)

  }, [])

  const deleteTweet = async (tweetId) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken')
      await api.delete(`tweet/${tweetId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    } catch (error) {
      console.log("STATUS:", error.response?.status)
      console.log("DATA:", error.response?.data)
      if (error.response?.data.message === 'Tweet not found')
        setSelfDelete(false)
      console.log("MSG:", error.message)
    }
  }

  const createComment = async (tweetId, comment) => {
    const token = await AsyncStorage.getItem('accessToken')
    try {
      await api.post('comments', {
        tweetId: tweetId,
        content: comment
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log("comment added!")
    } catch (error) {
      console.log("STATUS:", error.response?.status)
      console.log("DATA:", error.response?.data)
      console.log("MSG:", error.message)
    }
  }

  const renderTweets = ({ item }) => {

    const isLiked = item.likes.some(
      like => like.user.id === user?.id
    )

    const openComments = (tweet) => {
      setSelectedTweet(tweet)
    }

    return (
      <ThemedPostCard
        id={item.user.id}
        username={item.user.username}
        content={item.content}
        time={dayjs(item.createdAt).fromNow()}
        deleteTweet={() => deleteTweet(item.id)}
        selfDelete
        tweet={item}
        userId={item.user.id}
        handleLike={handleLike}
        isLiked={isLiked}
        onCommentPres={() => openComments(item)}
        selectedTweet={selectedTweet}
        createComment={createComment}
        user={user}
      />)
  }

  return (
    <ScreenWrapper >

      <ThemedView style={styles.container}>

        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText title style={styles.title}>Wave</ThemedText>

          <ThemedView style={{ flexDirection: 'row', gap: 8 }}>
            <Pressable onPress={() => {
              route.push({
                pathname: 'addusers',
                params: {userId: user.id}
              })
            }}>
              <Ionicons name="person-add-outline" size={26} color={theme.iconColor} />
            </Pressable>
            <Pressable onPress={() => route.push('newTweet')}>
              <Ionicons name="add-circle-outline" size={26} color={theme.iconColor} />
            </Pressable>
            <Pressable onPress={() => route.push('profile')}>
              <Ionicons name="home-outline" size={26} color={theme.iconColor} />
            </Pressable>
          </ThemedView>
        </ThemedView>

        <FlatList
          data={tweets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTweets}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />

      </ThemedView>

    </ScreenWrapper>
  )
}

export default home

const styles = StyleSheet.create({
  container: {
    flex: 1,

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