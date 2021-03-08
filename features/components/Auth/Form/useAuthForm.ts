/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import { useTypedController } from '@hookform/strictly-typed'

import { submitSurvey } from 'lib/api/survey'
import { getFromStorage, removeStorage } from 'features/util/localStorage'

import { authFormValidationSchema } from './auth-form-validation'
import { useRouter } from 'next/router'
import { omit } from 'lodash'
import { surveyStorageKey } from 'utils/consts'

export interface AuthFormState {
  email: string
}

export type UseAuthForm = ReturnType<typeof useAuthForm>

export const useAuthForm = () => {
  const { watch, control, errors, setError, handleSubmit } = useForm<AuthFormState>({
    reValidateMode: 'onChange',
    resolver: yupResolver(authFormValidationSchema),
    defaultValues: { email: '' },
  })

  const router = useRouter()

  const submitSurveyData = async (email: string) => {
    const surveyData = getFromStorage<{ [key: string]: any }>(
      process.env.localStorageKey || 'is_storage'
    )

    const { error, message } = await submitSurvey({
      surveyId: surveyData!.uid as string,
      email,
      uid: surveyData!.uid as string,
      result: omit(surveyData, 'uid'),
    })
    if (message) {
      removeStorage(process.env.localStorageKey || surveyStorageKey)
      router.replace('/home')
    } else {
      console.log('error', error)
      setError('email', {
        type: 'string',
        message: error
      })
    }
  }

  const Controller = useTypedController<AuthFormState>({ control })

  const fields = watch()

  const onSubmit = (payload: AuthFormState): void => {
    submitSurveyData(payload.email)
  }

  return {
    models: { fields, errors },
    operations: { handleSubmit, onSubmit },
    components: { Controller },
  }
}
