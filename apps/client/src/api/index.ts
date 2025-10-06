import axios from "axios"

console.log(process.env.VITE_API_URL)
axios.defaults.baseURL = process.env.VITE_API_URL
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
