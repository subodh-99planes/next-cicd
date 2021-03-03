/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SurveyDetails, SurveyElement } from 'utils/types'
import { getFromStorage, removeStorage, updateStorage } from 'features/util/localStorage'
import { GenericObject } from 'utils/utilTypes'
import { submitSurvey } from 'lib/api/survey'
import { useRouter } from 'next/router'
import useAuth from 'features/auth'
import { errors } from 'utils/localeConfig/en'
import _ from 'lodash'
import { surveyStorageKey } from 'utils/consts'

export type UseSurvey = ReturnType<typeof useSurvey>

export type UseSurveyParams = {
  email?: string
  userLocalData?: string
  survey: SurveyDetails
  isDesktop?: boolean
}


interface PageWithAnswers {
  title: string
  answers: GenericObject<string>
  surveyId: string
}

interface UserResponsePages {
  [key: string]: PageWithAnswers
}

type UserResponse = UserResponsePages & { uid: string }


const getSurveyUID = surveyDetails =>
  `${surveyDetails.id}_${surveyDetails.modifiedOn}`


// declarative conditions
const isOnFirstPage = _.memoize(page => page === 0)

const isOnFirstPageElement = _.memoize(subPage => subPage === 0)

const isMetaData = _.memoize(({ type, name }: SurveyElement) => type === 'dropdown' && name === 'metadata')

const getSurveyResultKey = (current: CurrentSlide) => `${current.surveyName}_${current.surveyId}`

const getMergedResults = (data: UserResponse, current: CurrentSlide) => {
  return {
    ...data,
    [getSurveyResultKey(current)]: {
      ...data[getSurveyResultKey(current)],
      title: current.header,
      answers: {
        ...data[getSurveyResultKey(current)]?.answers,
        [current!.name]: current?.answer || ''
      },
      surveyId: current.surveyId
    },
  }
}

export interface Slide extends SurveyElement {
  answer?: string
  key: string
  title: string
  meta: boolean
  page: number
  subPage: number
  header: string
  surveyName: string
  surveyId: string
  isRequired?: boolean
}

interface CurrentSlide extends Slide {
  slide: number,
}

const getCurrentSlide = (slides: Slide[], dataToPrefil: UserResponse) => {
  if (!dataToPrefil || Object.keys(dataToPrefil).length < 2) return 0
  for (const slideIndex in slides) {
    const slide = slides[slideIndex]
    if (!slide || (slide.name !== 'metadata' && !dataToPrefil[`${slide.surveyName}_${slide.surveyId}`]?.answers[slide.name])) {
      return Number(slideIndex)
    }
  }
  return 0
}


export const useSurvey = ({
  survey,
  email,
  userLocalData,
  isDesktop,
}: UseSurveyParams) => {
  const { pages, id } = survey
  const localStorageKey = process.env.localStorageKey || surveyStorageKey
  const dataToPrefil = useRef(getFromStorage(localStorageKey) as UserResponse)
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const memoizedSlides = useMemo(() => (pages
    ? pages.reduce<Slide[]>((acc, { title: pageTitle, elements, name: surveyName, surveyId }, page) => {
      const grouped = elements.reduce((groupedElements, element, subPage) => ([
        ...groupedElements,
        { ...element, surveyId, key: `${page}.${subPage}`, header: pageTitle, answer: dataToPrefil.current?.[getSurveyResultKey({ surveyName, surveyId } as CurrentSlide)]?.answers?.[element.name] || '', surveyName, meta: isMetaData(element), page, subPage }
      ]), [] as Slide[])
      return [...acc, ...grouped]
    }, [] as Slide[])
    : []),
  [pages, dataToPrefil])

  const [slides, updateSlides] = useState(memoizedSlides)
  const [current, updateCurrent] = useState<CurrentSlide>({ ...slides[0], slide: 0 })
  const isOnLastPage = useMemo(() => current.slide === slides.length - 1, [current.slide, slides.length])

  useEffect(() => {
    const currentSlide = getCurrentSlide(slides, dataToPrefil.current)
    updateCurrent({ ...slides[currentSlide], slide: currentSlide })
  }, [dataToPrefil, slides.length])

  const [data, setData] = useState<UserResponse>(
    dataToPrefil.current || {
      uid: getSurveyUID(survey),
    }
  )


  useEffect(() => {
    updateStorage(
      process.env.localStorageKey || 'is_storage',
      JSON.stringify(data, null, 2)
    )
  }, [data])

  // handles the answer selection and saving the currentAnswer in.
  const handleAnswerSelection = useCallback(
    ({ target: { value: answer } }, key: string) => {
      updateSlides(slides => slides.map(slide => key === slide.key ? { ...slide, answer } : slide))
      updateCurrent(current => {
        return { ...current, answer }
      })
    },
    []
  )

  const completeSurvey = useCallback(
    async (survey: { [key: string]: string }) => {
      const { message, error } = await submitSurvey({
        surveyId: id,
        email,
        uid: survey?.uid as string,
        result: _.omit(survey, 'uid')
      })
      if (message) {
        console.log('success')
        removeStorage(process.env.localStorageKey || 'is_storage')
        router.replace('/home')
      } else {
        console.log('error', error)
      }
    },
    [email, id, router]
  )

  useEffect(() => {
    const dataToPrefil = getFromStorage<UserResponse>(localStorageKey)
    if (!survey) {
      return
    }
    if (dataToPrefil && dataToPrefil.uid === getSurveyUID(survey)) {
      setData(dataToPrefil as UserResponse)
    }
  }, [localStorageKey, survey])

  const onComplete = useCallback(
    async (survey: { [key: string]: any }) => {
      if (!isAuthenticated) {
        return router.push({ pathname: '/auth', query: { source: 'survey' } })
      }
      await completeSurvey(survey)
    },
    [completeSurvey, isAuthenticated, router]
  )

  useEffect(() => {
    if (!isDesktop && isOnLastPage && current.answer) onComplete(data)
  }, [isOnLastPage, data, onComplete, current])

  useEffect(() => {
    if (email && userLocalData) {
      const surveyData = getFromStorage<UserResponse>(localStorageKey)
      if (surveyData) {
        // completeSurvey(surveyData as GenericObject<GenericObject>)
      } else {
        throw new Error(errors.survey.localDataUnavailable)
      }
    }
  }, [userLocalData, email, localStorageKey, completeSurvey])


  // handles next page - saves current slide to localstorage and increments current slide.
  const handleNext = useCallback(async callback => {
    if (isOnLastPage) {
      await onComplete(data)
      return
    }

    // increment current slide
    updateCurrent(current => {
      // update localstorage
      setData(data => {
        const x = getMergedResults(data, current)
        return x
      })
      return {
        ...slides[current.slide + 1],
        slide: current.slide + 1
      }
    })
    if (callback) callback()
  }, [onComplete, data, isOnLastPage, slides])



  // handles previous page, you can't navigate to previous survey part only through its current elements.
  const handlePrevious = useCallback(callbackFn => {
    if (current.page === 0 && current.subPage === 0) return

    updateCurrent(current => ({
      ...slides[current.slide - 1],
      slide: current.slide - 1
    }))

    if (callbackFn) callbackFn()
  }, [current.page, current.subPage, slides])

  return {
    models: {
      slides,
      current,
      subPageTotal: pages[current.page].elements.filter(
        ({ name }) => name !== 'metadata'
      ).length,
      conditions: {
        isOnFirstPage: isOnFirstPage(current.page),
        isOnFirstPageElement: isOnFirstPageElement(current.subPage),
        isOnLastPage
      },
    },
    operations: {
      handleNext,
      handlePrevious,
      handleAnswerSelection,
    },
  }
}
