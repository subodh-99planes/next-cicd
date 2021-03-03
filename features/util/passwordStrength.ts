import { labels } from 'utils/localeConfig/en'

const { strong, medium, enough } = labels.profile.passwordStrength

export default {
  [strong]: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})',
  [medium]: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
  [enough]: `'(?=.{6,}).*', 'g'`
}
