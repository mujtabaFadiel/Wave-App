import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../api/api'

const _Layout = () => {

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
    </Stack>
  )
}

export default _Layout

const styles = StyleSheet.create({})