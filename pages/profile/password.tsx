import React, { FC, useState } from 'react'
import Button from '../../features/components/CoreUI/Button/Button'
import FormInput from '../../features/components/CoreUI/FormInput/FormInput'
import styles from 'styles/pages/profile/profile.module.scss'
import { useRouter } from 'next/router'
import { Layout } from 'features/components/CoreUI'
import { setPassword } from 'lib/api/user'
import { validatePassword } from 'features/util/validations'
import Label from 'features/components/CoreUI/Label/Label'
import FlexContainer from 'features/components/CoreUI/FlexContainer/FlexContainer'
import { errors, labels } from 'utils/localeConfig/en'

interface Props {
  error?: string
}
interface PasswordObj {
  value: string
  touched: boolean
}
const passwordDefault = {
  value: '',
  touched: false,
}

const SetPassword: FC<Props> = ({ error: serverError = '' }) => {
  const [password, updatePassword] = useState<PasswordObj>(passwordDefault)
  const [passwordDouble, updatePasswordDouble] = useState<PasswordObj>(
    passwordDefault
  )
  const [passwordError, updatePasswordError] = useState(serverError)
  const [passwordDoubleError, updatePasswordDoubleError] = useState(serverError)
  const [passwordStrength, updatePasswordStrength] = useState('')

  const router = useRouter()
  const { token } = router.query

  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    updatePassword({ ...password, value: e.currentTarget.value })
    if (password.touched) {
      validatePasswordStrength(e)
    }
  }

  const onChangePasswordDouble = (e: React.FormEvent<HTMLInputElement>) => {
    updatePasswordDouble({ ...passwordDouble, value: e.currentTarget.value })
    if (passwordDouble.touched) {
      matchPasswords(e)
    }
  }

  const validatePasswordStrength = (e: React.FormEvent<HTMLInputElement>) => {
    if (!password.touched) updatePassword({ ...password, touched: true })
    const { value: passwordValue } = e.currentTarget
    const strength = validatePassword(passwordValue)
    if (!strength) {
      updatePasswordError(errors.profile.password.invalid)
      updatePasswordStrength('')
    } else {
      updatePasswordError('')
      updatePasswordStrength(strength as string)
    }
  }

  const submitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = setPassword({
      password: password.value,
      token: token as string,
    })
    router.replace(data ? '/home' : '/login')
  }

  const matchPasswords = (e: React.FormEvent<HTMLInputElement>) => {
    if (!passwordDouble.touched) { updatePasswordDouble({ ...passwordDouble, touched: true }) }

    const { value: passwordDoubleValue } = e.currentTarget
    updatePasswordDoubleError(
      passwordDoubleValue !== password.value
        ? errors.profile.password.mismatch
        : ''
    )
  }

  const disableSubmitbtn = () => {
    return (
      !passwordStrength ||
      !!passwordError ||
      !!passwordDoubleError ||
      !password.touched ||
      !passwordDouble.touched
    )
  }

  return (
    <Layout>
      <form className={styles.profile} onSubmit={submitData} noValidate={true}>
        <FlexContainer direction='col' align='start'>
          <FlexContainer direction='row' justify='spaceBetween'>
            <FormInput
              error={passwordError}
              label={labels.profile.password}
              value={password.value}
              type='password'
              name='password'
              inputClassname={styles.passwordInput}
              onChange={onChangePassword}
              onBlur={validatePasswordStrength}
            />
            <FormInput
              error={passwordDoubleError}
              label={labels.profile.reenterPassword}
              value={passwordDouble.value}
              type='password'
              name='passwordDouble'
              inputClassname={styles.passwordInput}
              onChange={onChangePasswordDouble}
              onBlur={matchPasswords}
            />
          </FlexContainer>
          <FlexContainer direction='row' classlist={styles.block}>
            <Label title={passwordStrength || ''} />
          </FlexContainer>
          <Button disabled={disableSubmitbtn()} type='submit'>
            {labels.profile.setPassword}
          </Button>
        </FlexContainer>
      </form>
    </Layout>
  )
}

export default SetPassword
