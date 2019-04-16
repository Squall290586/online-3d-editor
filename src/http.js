import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'http://192.168.0.25',
  headers: {
    'X-Api-Key': ''
  }
})
