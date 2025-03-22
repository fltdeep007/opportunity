import axios from 'axios'
const API_URL = "https://fakestoreapi.com"

const api = axios.create({
    baseURL: API_URL,
    HEADERS:{
        'Content-Type': 'application/json',
    }
})
export default api