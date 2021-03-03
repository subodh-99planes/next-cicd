import { useEffect, useState } from 'react'
import { getUser, login as loginUser, logout as logoutUser } from '../../lib/api/user'
import { UserDetails } from 'utils/types'
import { Error } from 'utils/utilTypes'
import { errors } from 'utils/localeConfig/en'
import { useRouter } from 'next/router'

interface Auth {
  loading: boolean,
  user: UserDetails | null,
  isAuthenticated: boolean,
  login: (email: string, password: string, callback?: () => void) => Promise<undefined | Error>,
  logout: () => void
}


const useAuth = ():Auth => {
  const [user, updateUser] = useState<UserDetails | null>(null)
  const [loading, updateLoading] = useState(true)
  
  const router = useRouter()

  const getAuthStatus = async () => {
    const userData = await getUser()
    if (userData) {
      updateUser(userData)
    } else {
      updateUser(null)
    }
    updateLoading(false)
  }

  const login = async (email, password, callback) => {
    updateLoading(true)
    const user = await loginUser({ password, email })
    updateLoading(false)
    if (!user || (user as Error).error) {
      return { error: (user as Error).error || errors.generic }
    }
    updateUser(user as UserDetails)
    if (callback) {
      await callback()
    }
    router.replace('/home')
  }

  const logout = async () => {
    const res = await logoutUser()
    if (!res?.error) {
      updateUser(null)
    }
    updateLoading(false)
    return res
  }

  useEffect(() => {
    getAuthStatus()
  }, [0])

  return { loading, user, isAuthenticated: !!user, login, logout }
}

export default useAuth
