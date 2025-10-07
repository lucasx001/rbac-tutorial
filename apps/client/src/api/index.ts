import axios from "axios"

axios.defaults.baseURL = process.env.VITE_API_URL
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
