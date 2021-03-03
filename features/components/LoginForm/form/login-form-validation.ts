import * as yup from 'yup'

import { errors } from 'utils/localeConfig/en'

export const loginFormValidationSchema = yup.object({
  email: yup
    .string()
    .required(`${errors.login.email.required}`)
    .email(`${errors.login.email.invalid}`),
  password: yup
    .string()
    .required(`${errors.login.password.required}`)
    .min(8, `${errors.login.password.min}`),
})
