import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import LoginForm from 'features/components/LoginForm'
import { Layout } from 'features/components/CoreUI'
import useAuth from '../../features/auth'

import FlexContainer from 'features/components/CoreUI/FlexContainer/FlexContainer'

const Login: FC = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/home')
    }
  }, [isAuthenticated])

  return (
    <Layout>
      <FlexContainer>
        <LoginForm />
      </FlexContainer>
    </Layout>
  )
}

export default Login
