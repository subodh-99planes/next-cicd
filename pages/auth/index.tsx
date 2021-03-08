import React, { FC, useCallback, useState } from 'react'

import { labels } from 'utils/localeConfig/en'
import {
  Divider,
  Header,
  Layout,
  Main,
  SocialButton,
  Typography,
} from 'features/components/CoreUI'

import styles from 'styles/pages/auth/auth.module.scss'
import { AuthForm } from 'features/components/Auth/Form/AuthForm'
import { LoginForm } from 'features/components/LoginForm/form'
import FlexContainer from 'features/components/CoreUI/FlexContainer/FlexContainer'

interface Props {
  onSubmit: any
  loginWithGoogle: () => void
  loginWithFacebook: () => void
  error?: string
}

const loginWithGoogle = async () => {
  const host = window.location.host
  window.open(`http://${host}/auth/google`, '_self')
}
const loginWithFacebook = async () => {
  const host = window.location.host
  window.open(`http://${host}/auth/facebook`, '_self')
}

const Auth: FC<Props> = () => {
  const [showLogin, updateShowLogin] = useState(false)

  const toggleShowLogin = useCallback(() => {
    updateShowLogin(showLogin => !showLogin)
  }, [])

  return (
    <Layout>
      <Header />
      <Main>
        <Main.Sidebar>
          <div className={styles.sidebarContainer}>
            <p>
              {labels.auth.sidebarText.line1} <br />
              {labels.auth.sidebarText.line2}
            </p>
          </div>
        </Main.Sidebar>
        <Main.Content>
          <FlexContainer direction='col' classlist={styles.wrapper}>
            <Typography variant='h1'>{labels.auth.title}</Typography>
            <Typography>
              <br />
              {labels.auth.desc.line1} <br /> {labels.auth.desc.line2}
            </Typography>
            <div className={styles.socialContainer}>
              <SocialButton onClick={loginWithFacebook} variant='facebook' styleClass={styles.socialButton} />
              <SocialButton onClick={loginWithGoogle} variant='google' styleClass={styles.socialButton} />
            </div>
            <Divider text={labels.auth.dividerText} />
            <div className={styles.formContainer}>
              {showLogin ? <LoginForm /> : <AuthForm />}
              {showLogin ? null : <div className={styles.formSubButtonContainer}>
                <span>
                  {labels.auth.hasAccount}{' '}
                  <span
                    className={styles.formSubBtn}
                    role='button'
                    onClick={toggleShowLogin}
                  >
                    {labels.auth.login}
                  </span>
                </span>
              </div>}
            </div>
          </FlexContainer>
        </Main.Content>
      </Main>
    </Layout>
  )
}

export default Auth
