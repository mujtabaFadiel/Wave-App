import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemedView from './ThemedView'
import ThemedTextInput from './ThemedTextInput'
import { Image } from 'expo-image'
import avatar from '../assets/images/avatar.jpeg'
import ThemedText from './ThemedText'
import { Ionicons } from '@expo/vector-icons'
import { hp, wp } from '../helpers/common'
import { Theme } from '../constants/Theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../api/api'
import { router, useRouter } from 'expo-router'
import ScreenWrapper from './ScreenWrapper'

const ModalCard = ({ visible }) => {
  const colorScheme = useColorScheme()
  const theme = Theme[colorScheme] ?? Theme.dark

  const route = useRouter()
  return (
    <Modal
        visible={visible}
        animationType='slide'
        transparent={true}
        style={{paddingBottom: 2}}
    >
        <ThemedView style={{
            flex: 1, 
            justifyContent: 'flex-end'
        }}>

            <ThemedView style={{
                //backgroundColor:
                padding: 20,
                borderTopLeftRadius: 20, 
                borderTopRightRadius: 20, 
            }}>
                <ThemedTextInput 
                    placeholder='write a comment'
                />
                <Pressable onPress={() => console.log("clicked")}>
                    <ThemedText>sent</ThemedText>
                </Pressable>
            </ThemedView>    
        </ThemedView>
    </Modal>
  )
}

export default ModalCard

const styles = StyleSheet.create({})