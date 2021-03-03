import { GenericObject, Nullable } from '../../utils/utilTypes'

export const updateStorage = (storageKey: string, value: string) => {
  window.localStorage && window.localStorage.setItem(storageKey, value)
}

export const removeStorage = (storageKey: string) => {
  window.localStorage && window.localStorage.removeItem((storageKey))
}

export const getFromStorage = <T>(storageKey: string): T | Nullable<GenericObject> => {
  let item = null
  try {
    item = window.localStorage ? JSON.parse(window.localStorage.getItem(storageKey) || '') : null
    return item
  } catch {
    return item
  }
}
