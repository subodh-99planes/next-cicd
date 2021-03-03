import React, { FC, useEffect } from 'react'
import { keys } from 'lodash'
import { labels } from 'utils/localeConfig/en'
import WithAuth from 'features/auth/WithAuth'
import FlexContainer from 'features/components/CoreUI/FlexContainer/FlexContainer'
import User from 'features/components/User'
import useAuth from 'features/auth'
import { useRouter } from 'next/router'

import { surveyStorageKey } from '../../utils/consts'
import { getFromStorage, removeStorage } from '../../features/util/localStorage'
// import { GenericObject } from '../../utils/utilTypes'
// import { submitSurvey } from '../../lib/api/survey'

const Home: FC = () => {
  const { loading, user, logout } = useAuth()

  const router = useRouter()
  const localStorageKey = process.env.localStorageKey || surveyStorageKey

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    } else {
      const surveyFromLocal = getFromStorage(localStorageKey)
      removeStorage(localStorageKey)
      if (keys(surveyFromLocal).length > 0) {
        // submitSurveyFromLocal(surveyFromLocal as { [key: string]: GenericObject })
      }
    }
  }, [user, loading, router])

  /*  const submitSurveyFromLocal = useCallback(
    async (survey: { [key: string]: string }) => {
      const { error } = await submitSurvey({
        surveyId: survey?.uid?.split('_')[0] as string,
        email: user?.email,
        uid: survey?.uid as string,
        result: omit(survey, 'uid')
      })
      if (error) {
        console.log('error', error)
      }
    },
    [user]
  ) */

  return (<FlexContainer justify='spaceBetween'>
    <div>{labels.home.welcome} {user?.email}!</div>
    <User isAuthenticated={!!user} user={user} logout={logout}/>
  </FlexContainer>)
}



export default WithAuth(Home)
