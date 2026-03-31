import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

const api = axios.create({
  baseURL: 'http://10.228.104.119:3000'
})

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('accessToken')
      
      setTimeout(() => {
        router.replace('/(auth)/login')
      }, 0)
    }

    return Promise.reject(error)
  }
)

export default api