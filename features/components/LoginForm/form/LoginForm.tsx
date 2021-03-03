import React, { FC } from 'react'

import { FormInput, FormWrapper } from 'features/components/CoreUI'
import Button from 'features/components/CoreUI/Button/Button'
import { labels } from 'utils/localeConfig/en'

import styles from './LoginForm.module.scss'
import { useLoginForm } from './useLoginForm'

export const LoginForm: FC = () => {
  const {
    models: { errors },
    operations: { handleSubmit, onSubmit },
    components: { Controller },
  } = useLoginForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormWrapper label='Email Address' errors={errors} name='email'>
        <Controller name='email' render={props => <FormInput {...props} />} />
      </FormWrapper>
      <FormWrapper label='Password' errors={errors} name='password'>
        <Controller
          name='password'
          render={props => <FormInput type='password' {...props} />}
        />
      </FormWrapper>
      <div className={styles.formBtnContainer}>
        <Button type='submit' variant='gradient'>
          {labels.survey.login}
        </Button>
      </div>
    </form>
  )
}
