import axios from 'axios'
import { config } from './config'

export const getUserData = async () => {
    return new Promise((resolve, reject) => {
        try {
            axios.post('https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/users', config)
                .then((response) => {
                    resolve(response)
                }
                ).catch((error) => {
                    reject(error.response)
                    console.error(error)
                })
        } catch (e) {
            reject(e)
            console.error(e)
        }
    })
}