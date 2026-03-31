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
import avatar from '../../assets/images/avatar.jpeg'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'

const profile = () => {
    const colorScheme = useColorScheme()
    const theme = Theme[colorScheme] ?? Theme.light

    const route = useRouter()
    
    const [user, setUser] = useState('')
    
    const getUser = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken')

      try {
        const res = await api.get('auth/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        
        setUser(res.data)
        console.log(res.data)

      } catch (error) {
        console.log("err:", error)
        console.log("STATUS:", error.response?.status)
        console.log("DATA:", error.response?.data)
        console.log("MSG:", error.message)
      }
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('accessToken')
            route.replace('login')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      getUser()
    }, [])
    
  return (
    <ScreenWrapper>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>

            <Pressable onPress={() => route.back()}>
                <Ionicons name="arrow-back-outline" size={26} color={theme.iconColor} />
            </Pressable>
          <ThemedText title style={styles.title}>Profile</ThemedText>

          <ThemedView style={{ flexDirection: 'row', gap: 8 }}>
            <Pressable onPress={logout}>
                <Ionicons name="exit-outline" size={26} color={theme.iconColor} />
            </Pressable>
          </ThemedView>

        </ThemedView>
        
        <ThemedView style={styles.contain}> 
          <ThemedView style={[styles.avatarContainer, {gap: 15}]}>
            
            <ThemedView style={{borderRadius: Theme.radius.xxl * 100}}>
              <Image 
                source={avatar} 
                style={{ width: hp(12), height: hp(12), borderRadius: Theme.radius.xxl * 100 }} 
              />

              <Pressable style={styles.editIcon} onPress={() => route.push({
                pathname: 'editPage',
                params: {
                  user: JSON.stringify(user)
                }
              })}>
                <Ionicons name='create-outline' size={24} color={theme.iconColor} />
              </Pressable>

            </ThemedView>

            {/*Username*/}
            <ThemedView style={{alignItems: 'center', gap: 4}}>
              <ThemedText>
                { user.username }
              </ThemedText>
            </ThemedView>
          </ThemedView>

            {/*email & bio*/}
            <ThemedView style={{gap: 10, marginHorizontal: hp(1.6)}}>
              
              <ThemedView style={[styles.info,{flexDirection: 'row'}]}>
                <Ionicons name='person' size={20} color={theme.iconColor}/>
                <ThemedText style={[styles.infoTxt, { fontSize: 18 }]}>
                  { user.email }
                </ThemedText>
              </ThemedView>

              <ThemedView style={[styles.info,{flexDirection: 'row',}]}>
                <Ionicons name='pencil' size={20} color={theme.iconColor}/>
                <ThemedText style={styles.infoTxt}>
                  { user.bio ? user.bio : "add bio..."}
                </ThemedText>
              </ThemedView>

            </ThemedView>

        </ThemedView>

      </ThemedView>
    </ScreenWrapper>
  )
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contain: {
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: wp(4)
  },
  title: {
    fontSize: hp(3.2),
    fontWeight: Theme.fonts.bold
  },

  contain: {},
  avatarContainer: {
    alignSelf: 'center',
    width: hp(12),
    //height: hp(12),
    marginBottom: 30
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    end: -4,
    padding: 3,
    borderRadius: 50,
    backgroundColor: '#fff'
  },
  username: {
    fontSize: hp(3),
    fontWeight: '500'
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  infoTxt: {
    fontSize: hp(1.6),
    fontWeight: '500',
  }
})