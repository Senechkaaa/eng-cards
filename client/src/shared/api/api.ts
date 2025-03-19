import { API_URL } from '../const/api_url'
import axios from 'axios'
import { AuthResponce } from '../types/AuthResponce'

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        console.log('Token:', token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

$api.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if (
            error.response.status == 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true
            try {
                const response = await axios.get<AuthResponce>(
                    `${API_URL}/refresh`,
                    { withCredentials: true },
                )
                localStorage.setItem('token', response.data.access_token)
                return $api.request(originalRequest)
            } catch (e) {
                console.log('НЕ АВТОРИЗОВАН', e)
            }
        }
        throw error
    },
)

export default $api
