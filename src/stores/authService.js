import api from '@/axios'

export async function login(data) {
  const response = await api.post('/api/auth/login', data)
  return response.data
}

export async function logout() {
  const response = await api.post('/api/auth/logout')
  return response.data
}

export async function fetchUser() {
  const response = await api.get('/api/auth/me')
  return response.data
}
