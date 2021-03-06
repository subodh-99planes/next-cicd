import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps, NextPage } from 'next'
import { getSurvey } from '../lib/api/survey'
import getCookies from 'next-cookies'
import { SurveyDetails } from '../utils/types'
import { errors } from '../utils/localeConfig/en'
import { Header, Layout } from 'features/components/CoreUI'
import { Survey } from 'features/survey'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
const Tutorial = dynamic(() =>
  import('features/components/Tutorial'), { ssr: false })

interface Props {
  surveyDetails: SurveyDetails;
  email?: string;
  userLocalData?: string;
  error: string;
}

const Home: NextPage<Props> = ({
  surveyDetails,
  userLocalData,
  email = '',
  error,
}) =>  {
  const router = useRouter()
  useEffect(() => {
    if (error?.length) {
      toast.error(errors.survey.not_found_redirect)
      router.replace('/')
    }
  }, [error])

  return (
    <>
      <Tutorial/>
      <Layout>
        <Header />
        testingtest
        {!error && <Survey survey={surveyDetails} email={email} userLocalData={userLocalData} />}
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const surveyId   = context?.query?.surveyId
  const surveyData = await getSurvey(surveyId as string)
  const cookies    = getCookies(context)

  return {
    props: {
      email: cookies.useremail ?? null,
      userLocalData: cookies[process.env.userdataCookie!] ?? null,
      surveyDetails: surveyData,
      error: surveyData?.error || '',
    },
  }
}

export default Home
