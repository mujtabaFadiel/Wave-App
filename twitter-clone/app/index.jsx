import { Image, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import ScreenWrapper from '../components/ScreenWrapper'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedButton from '../components/ThemedButton'
import { wp, hp } from '../helpers/common'
import { Theme } from '@/constants/Theme'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Welcome = () => {
  const router = useRouter()

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('accessToken')
    if(token) router.replace('/(main)/home')
  }

  useEffect(() => {
    checkToken()
  }, [])
  
  return (
    <ScreenWrapper>

      <StatusBar style="dark" />

      <ThemedView style={styles.container}>

        {/* Welcome Image */}
        <Image
          style={styles.welcomeImg}
          resizeMode="contain"
          source={require('../assets/images/welcome.png')}
        />

        {/* Title */}
        <ThemedView style={{ gap: 20 }}>
          <ThemedText title style={styles.title}>
            Wave
          </ThemedText>

          <ThemedText style={styles.punchline}>
            Every image tells a story
          </ThemedText>
        </ThemedView>

        {/* Footer */}
        <ThemedView style={styles.footer}>

          <ThemedButton style={styles.btn} onPress={() => router.push('/(auth)/signUp')}>
            <ThemedText style={styles.text}>
              Getting Started
            </ThemedText>
          </ThemedButton>

          <ThemedView style={styles.bottomTxtContainer}>
            <ThemedText>
              Already have an Account!
            </ThemedText>

            <Pressable onPress={() => router.push('/(auth)/login')}>
              <ThemedText style={styles.loginText}>
                Login
              </ThemedText>
            </Pressable>
          </ThemedView>

        </ThemedView>

      </ThemedView>

    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: wp(4),
  },

  welcomeImg: {
    height: hp(30),
    width: wp(100),
    alignSelf: 'center'
  },

  title: {
    fontSize: hp(4),
    textAlign: 'center',
    fontWeight: Theme.fonts.extraBold,
  },

  punchline: {
    paddingHorizontal: wp(10),
    textAlign: 'center',
    fontSize: hp(1.7),
  },

  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderCurve: 'continuous',
  },

  text: {
    fontSize: hp(1.7),
    fontWeight: Theme.fonts.bold
  },

  footer: {
    gap: 30,
  },

  bottomTxtContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },

  loginText: {
    textAlign: 'center',
    fontSize: hp(1.6),
    color: Theme.primary
  }

})