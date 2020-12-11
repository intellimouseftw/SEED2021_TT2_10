import axios from 'axios'

let config = {
    "headers": {
        "x-api-key": "Z1DcxhVb3J2TR8rrWiqJh1vFGMHJMPI0a8Wi6Wse"
    }
}

export const getTxData = async (formData) => {
    return new Promise((resolve, reject) => {
        try {
            axios.post('https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/transaction/view', formData, config)
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