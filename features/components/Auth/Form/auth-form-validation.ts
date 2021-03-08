import * as yup from 'yup'

import { errors } from 'utils/localeConfig/en'

export const authFormValidationSchema = yup.object({
  email: yup
    .string()
    .required(`${errors.login.email.required}`)
    .email(`${errors.login.email.invalid}`),
})
