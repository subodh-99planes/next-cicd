import { errors } from './localeConfig/en'

const withTryCatch = async (f: (...args: any[]) => any, ...args)  => {
  try {
    const result = await f(...(args.length ? args : []))
    return result
  } catch (e) {
    return { error: e.error || e.message || errors.generic.unknown_error }
  }
}
export default withTryCatch
