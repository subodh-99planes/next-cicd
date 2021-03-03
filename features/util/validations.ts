import passwordStrength from './passwordStrength'

export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

type validatePasswordReturnValues = undefined | keyof typeof passwordStrength

export const validatePassword = (password: string): validatePasswordReturnValues => {
  if (!password) {
    return
  }
  return (Object.keys(passwordStrength) as  Array<keyof typeof passwordStrength>).find(k => {
    return (new RegExp(passwordStrength[k])).test(password)
  })
}


