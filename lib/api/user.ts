import { AxiosRequestConfig } from 'axios'
import sendRequest from './sendRequest'
import { Error, GenericObject } from '../../utils/utilTypes'
import { UserDetails } from 'utils/types'
const BASE_PATH = '/user'

export const login = async ({ email, password }: {email: string, password: string}): Promise<UserDetails | Error> => {
  const formData = new FormData()
  formData.set('email', email)
  formData.set('password', password)

  const requestOptions: AxiosRequestConfig = {
    method: 'POST',
    data: formData
  }

  const res = await sendRequest<any>(`/auth/login`, requestOptions)
  return res
}

export const logout = async () => {
  const res = await sendRequest('/auth/logout', { method: 'GET' })
  return res
}

export const getUser = async() => {
  const requestOptions: AxiosRequestConfig = {
    method: 'GET',
  }

  const res = await sendRequest<any>(`${BASE_PATH}/me`, requestOptions)
  return res?.user
}

export const setPassword = async ({ password, token }: {password: string, token: string}): Promise<GenericObject> => {
  const formData = new FormData()
  formData.set('password', password)
  formData.set('token', token)

  const requestOptions: AxiosRequestConfig = {
    method: 'POST',
    data: formData
  }

  const res = await sendRequest<any>(`${BASE_PATH}/password`, requestOptions)
  return res
}
