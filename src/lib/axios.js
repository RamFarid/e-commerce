import axios from 'axios'

const server = axios.create({
  baseURL: 'http://192.168.137.1:5000',
})

export default server
