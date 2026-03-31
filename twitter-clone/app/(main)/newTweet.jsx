import { FlatList, Text, Pressable, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import ThemedText from '../../components/ThemedText'
import ThemedView from '../../components/ThemedView'
import RichTextEditor from '../../components/RichTextEditor'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
import { wp, hp } from '../../helpers/common'
import { Theme } from '../../constants/Theme'
import avatar from '../../assets/images/avatar.jpeg'
import api from '../../api/api'

import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import { useRouter } from 'expo-router'
import ThemedPostCard from '../../components/ThemedPostCard'
import { ScrollView } from 'react-native'
import { Image } from 'expo-image'
import ThemedButton from '../../components/ThemedButton'

const newTweet = () => {
  const colorScheme = useColorScheme()
  const theme = Theme[colorScheme] ?? Theme.dark

  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')

  const editor = useRef()

  const route = useRouter()

  const submit = async () => {
    const plainTxt = text.replace((/<[^>]+>/g, ''))
    console.log("plainTxt", plainTxt)

    const token = await AsyncStorage.getItem('accessToken')
    console.log("token:      ", token)
    console.log("text:      ", text)
    try {
      const res = await api.post(
        'tweet',
        { content: text },   
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log("Done")

      route.push('home')

    } catch (error) {

      //setIsloading(false)
      console.log("STATUS:", error.response?.status)
      console.log("DATA:", error.response?.data)
      console.log("MSG:", error.message)
    }
  }

  return (
    <ScreenWrapper>
      <ThemedView style={styles.container}>

        <ThemedView style={styles.header}>
          <Pressable onPress={() => route.back()}>
            <Ionicons name="arrow-back-outline" size={26} color={theme.iconColor} />
          </Pressable>
          <ThemedText title style={styles.title}>Post</ThemedText>

          <ThemedView style={{ flexDirection: 'row', gap: 8 }}>
            <Pressable>
              <Image
                source={avatar}
                style={[styles.avatar, { borderColor: theme.iconColor }]}
              />
            </Pressable>
          </ThemedView>

        </ThemedView>

        <ScrollView style={{}}>
          <ThemedView style={styles.textEditor}>
            <RichTextEditor
              onChange={(text) => setText(text)}
            />
          </ThemedView>

          {/* <ThemedView style={[styles.media, { borderColor: theme.iconColor, borderWidth: 0.6 }]}>
            <ThemedText style={styles.addImgTxt}>Add to your post</ThemedText>
            <ThemedView style={styles.mediaIcon}>
              <TouchableOpacity>
                <Ionicons name='image-outline' size={30} color={theme.iconColor} />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView> */}
        </ScrollView>

        {isLoading ?
          (<ActivityIndicator size={'large'} color={'#6849a7'} />) : (
            <ThemedButton onPress={submit}>
              <ThemedText style={{ fontWeight: Theme.fonts.semiBold, color: '#fff' }}>
                Post
              </ThemedText>
            </ThemedButton>
          )
        }
      </ThemedView>
    </ScreenWrapper>
  )
}

export default newTweet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    marginBottom: 70,
    paddingHorizontal: wp(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: wp(4)
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: Theme.fonts.semiBold,
    textAlign: 'center'
  },
  username: {
    fontSize: hp(2.2),
    fontWeight: Theme.fonts.semiBold
  },
  media: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: Theme.radius.xl,
    borderCurve: 'continuous',
  },
  mediaIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  addImgTxt: {
    fontSize: hp(1.9),
    fontWeight: Theme.fonts.semiBold,
  },
  imageIcon: {
    borderRadius: Theme.radius.md
  },
  file: {
    height: hp(30),
    width: '100%',
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
    borderCurve: 'continuous'
  },
  viedo: {},
  coloseIcon: {
    position: 'absolute',
    top: 10,
    end: 10
  },
  avatar: {
    width: hp(3.5),
    height: hp(3.5),
    borderRadius: Theme.radius.xxl * 100,
    borderCurve: 'countinuous',
    borderWidth: 1,
  },
})