/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import useAuth  from './index'
import { useRouter } from 'next/router'


const WithAuth = Component => (props = {}) => {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login')
    }
  }, [loading, isAuthenticated])

  return loading ? <div>Loading...</div> : (isAuthenticated ? <Component {...props} /> : null)
}

export default WithAuth
