import axios from 'axios'

const api = axios.create({
  baseURL: 'https://beertestingbruges.be',
  withCredentials: true,
})

export default api
