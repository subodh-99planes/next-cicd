import React, { FC } from 'react'
import Button from '../CoreUI/Button/Button'
import { labels } from 'utils/localeConfig/en'
import { UserDetails } from 'utils/types'

interface Props {
  isAuthenticated: boolean,
  user: UserDetails | null,
  logout: () => void
}

const User: FC<Props> = ({ isAuthenticated, user, logout }) => (isAuthenticated
  ? (<section>
    {user?.email} <Button onClick={logout}>{labels.auth.logout}</Button>
  </section>)
  : null)
export default User
