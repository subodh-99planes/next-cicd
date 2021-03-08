import React, { FC } from 'react'

import { FormInput, FormWrapper } from 'features/components/CoreUI'
import Button from 'features/components/CoreUI/Button/Button'
import { labels } from 'utils/localeConfig/en'

import styles from 'styles/pages/auth/form/AuthForm.module.scss'
import { useAuthForm } from './useAuthForm'

export const AuthForm: FC = () => {
  const {
    models: { errors },
    operations: { handleSubmit, onSubmit },
    components: { Controller },
  } = useAuthForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormWrapper label='Email Address' errors={errors} name='email'>
        <Controller name='email' render={props => <FormInput {...props} />} />
      </FormWrapper>
      <div className={styles.formBtnContainer}>
        <Button type='submit' variant='gradient'>
          {labels.survey.seeResults}
        </Button>
      </div>
    </form>
  )
}
