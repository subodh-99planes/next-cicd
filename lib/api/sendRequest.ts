import axios, { AxiosRequestConfig } from 'axios'

import getRootUrl from './getRootUrl'
import { GenericObject } from '../../utils/utilTypes'
import { errors } from 'utils/localeConfig/en'

const api = axios.create({
  baseURL: getRootUrl(),
  headers: {
    post: { 'Content-Type': 'application/json' },
  },
})

const sendRequest = async <T = GenericObject>(
  path: string,
  opts: AxiosRequestConfig = { method: 'POST', headers: {} }
): Promise<T | { error: string }> => {
  try {
    const response = await api.request({
      method: opts.method,
      url: path,
      headers: opts.headers,
      timeout: 5000,
      ...opts,
    })
    const { data } = response
    if (data?.error) {
      return { error: data.error }
    }
    return data
  } catch (error) {
    return { error: error.message || errors.generic }
  }
}

export default sendRequest
