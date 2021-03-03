import React, { FC, useState } from 'react'
import useAuth from 'features/auth'

import FlexContainer from 'features/components/CoreUI/FlexContainer/FlexContainer'
import Button from '../CoreUI/Button/Button'
import FormInput from '../CoreUI/FormInput/FormInput'

import { labels } from 'utils/localeConfig/en'

import styles from './LoginForm.module.scss'

interface props {
  loginCallback?: () => unknown
}

const LoginForm: FC<props> = ({ loginCallback }) => {
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')
  const [error, updateError] = useState('')
  const { login } = useAuth()

  const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    updateEmail(e.currentTarget.value)
  }

  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    updatePassword(e.currentTarget.value)
  }

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = await login(email, password, loginCallback)
    if (data?.error) {
      return updateError(data.error)
    }
  }

  const disableSubmitbtn = () => {
    return !email || !password
  }

  return (
    <form className={styles.profile} onSubmit={submitData} noValidate={true}>
      <FlexContainer direction='col' align='start'>
        <FlexContainer direction='row' justify='spaceBetween'>
          <FormInput
            autoFocus
            error={error}
            label={labels.auth.email}
            value={email}
            type='email'
            name='email'
            inputClassname={styles.emailInput}
            onChange={onChangeEmail}
          />
          <FormInput
            label={labels.auth.password}
            value={password}
            type='password'
            name='password'
            inputClassname={styles.passwordInput}
            onChange={onChangePassword}
          />
        </FlexContainer>
        <Button disabled={disableSubmitbtn()} variant='gradient' type='submit'>
          {labels.auth.login}
        </Button>
      </FlexContainer>
    </form>
  )
}

export default LoginForm
