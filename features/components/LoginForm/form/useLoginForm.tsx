/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import { useTypedController } from '@hookform/strictly-typed'

import useAuth from 'features/auth'
import { loginFormValidationSchema } from './login-form-validation'

export interface LoginFormState {
  email: string
  password: string
}

export type UseLoginForm = ReturnType<typeof useLoginForm>

export const useLoginForm = () => {
  const { login } = useAuth()

  const { watch, control, errors, handleSubmit, setError } = useForm<LoginFormState>({
    reValidateMode: 'onChange',
    resolver: yupResolver(loginFormValidationSchema),
  })

  const Controller = useTypedController<LoginFormState>({ control })

  const fields = watch()

  const onSubmit = async (payload: LoginFormState) => {
    const res = await login(payload.email, payload.password)
    if (res?.error) {
      setError('email', {
        type: 'string',
        message: res.error
      })
    }
  }

  return {
    models: { fields, errors },
    operations: { handleSubmit, onSubmit },
    components: { Controller },
  }
}
