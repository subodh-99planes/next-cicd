import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { labels } from 'utils/localeConfig/en'

import { Main } from '../components/CoreUI'
import styles from './Survey.module.scss'
import {
  SurveyCard,
  SurveyPageMeta,
  SurveyRadioGroup,
  SurveySidebar,
  SurveySidebarLanding,
} from './components'
import { Slide, UseSurveyParams, useSurvey } from './useSurvey'
import Button from '../components/CoreUI/Button/Button'
import FlexContainer from '../components/CoreUI/FlexContainer/FlexContainer'
import { Progress } from '../components/CoreUI/Progress'
import SwipeableViews from 'react-swipeable-views'
import { useWindowSize } from 'features/hooks'
import { mobileWidth } from 'utils/consts'

type Props = UseSurveyParams

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}


const MemoizedSurveyCard = React.memo(({ slide, handleAnswerSelection }: {slide: Slide, handleAnswerSelection: (event: ChangeEvent<HTMLInputElement>, key: string) => void}) => {
  return <SurveyCard key={slide.key}>
    {slide.meta ? (
      <SurveyPageMeta
        key={slide.key}
        data={slide}
        title={slide.header}
        page={slide.page}
      />
    ) : (
      <SurveyRadioGroup
        key={slide.key}
        data={slide}
        page={slide.page}
        answer={slide.answer || ''}
        handleSelect={(event: ChangeEvent<HTMLInputElement>) => handleAnswerSelection(event, slide.key)}
      />
    )}
  </SurveyCard>
})

export const Survey: FC<Props> = ({ survey, email, userLocalData }) => {
  const { width } = useWindowSize()
  const isDesktop = useMemo(() => {
    return width && width > mobileWidth
  }, [width])

  const {
    models: {
      slides,
      current,
      subPageTotal,
      conditions: {
        isOnFirstPage,
        isOnLastPage,
      },
    },
    operations: { handleNext, handlePrevious, handleAnswerSelection },
  } = useSurvey({ survey, email, userLocalData, isDesktop: !!isDesktop })

  const mainRef = useRef() as React.MutableRefObject<HTMLDivElement>


  const [visibleSlides, updateVisibleSlides] = useState(slides.slice(0, current.slide + 2))

  // navigation index tracks the difference between next and previous page navigations
  const [navigationIndex, updateNavigationIndex] = useState(0)

  useEffect(() => {
    updateVisibleSlides(visibleSlides => {
      if (!current.isRequired) {
        const nextIsRequiredIndex = slides.findIndex((val, ind) => val.isRequired && ind > current.slide)
        const visibleSlideIndex   = (nextIsRequiredIndex > 0 ? nextIsRequiredIndex : current.slide) + 1
        return (slides.slice(0, visibleSlideIndex))
      }
      if (current.slide >= visibleSlides.length) {
        return (slides.slice(0, current.slide + 2))
      } else if ((current.slide === visibleSlides.length - 1) && (current.meta ||  (current.answer && !visibleSlides[visibleSlides.length - 1].answer))) {
        return (slides.slice(0, current.slide + 2))
      }
      return slides.slice(0, visibleSlides.length)
    })
  }, [current, slides, isOnLastPage])

  const scrollToTop = useCallback(() => {
    mainRef.current.scrollTo(0, 0)
  }, [])

  const handleNextDesktop = useCallback(() => {
    if (!isDesktop) return
    handleNext(() => {
      scrollToTop()
      // if the user has manually navigated back, update the navigation index
      if (navigationIndex < 0) {
        updateNavigationIndex(navigationIndex + 1)
      }
    })
  }, [isDesktop, handleNext, scrollToTop, navigationIndex])


  const handleAnswerSelectionWithAutoAdvance = useCallback((event: ChangeEvent<HTMLInputElement>, key: string) => {
    handleAnswerSelection(event, key)
    if (isDesktop) {
      // auto advance after 1s
      setTimeout(handleNextDesktop, 1000)
    }
  }, [isDesktop, handleAnswerSelection, handleNextDesktop])

  return (
    <Main parentRef={mainRef}>
      <Main.Sidebar>
        {isOnFirstPage ? (
          <SurveySidebarLanding />
        ) : (
          <SurveySidebar
            subPage={current.subPage}
            page={current.page}
            title={current.header}
            description={current.description}
            handleBackClick={() => {
              handlePrevious(scrollToTop)
              updateNavigationIndex(index => index - 1)
            }}
          />
        )}
      </Main.Sidebar>
      <Main.Content>
        <Main.Slider>
          <SwipeableViews
            enableMouseEvents={!isDesktop}
            index={current.slide}
            onChangeIndex={(newIndex, lastIndex) => {
              if (isDesktop) return
              if (lastIndex < newIndex) {
                handleNext(scrollToTop)
              } else handlePrevious(scrollToTop)
            }}
            disableLazyLoading
            containerStyle={isDesktop ? { maxHeight: '540px' } : {}}
            slideStyle={isDesktop ? { maxHeight: '540px' } : {}}
          >
            {visibleSlides.map(slide => (<MemoizedSurveyCard key={slide.key} slide={slide} handleAnswerSelection={current.key === slide.key ? handleAnswerSelectionWithAutoAdvance : noop}/>))}
          </SwipeableViews>
        </Main.Slider>
        <Main.Footer>
          <div>
            {!current.meta && (
              <div className={styles.btnMargin}>
                <Progress
                  subPageTotal={subPageTotal}
                  currentSubPageCount={current.subPage}
                />
              </div>
            )}
            {!current.isRequired && (
              <div className={styles.skipButton}>
                <Button variant='inverse' onClick={handleNextDesktop}>
                  {labels.survey.skip}
                </Button>
              </div>
            )}
            <FlexContainer
              justify='start'
              classlist={`${styles.nextBtnContainer} ${(current.meta || navigationIndex < 0) && styles.visible}`}
            >
              <Button
                index={current.page + 1}
                onClick={handleNextDesktop}
                disabled={isOnLastPage && !current.answer}
              >
                {current.meta
                  ? labels.survey.start
                  : navigationIndex < 0
                    ? labels.survey.next
                    : labels.survey.view
                }
              </Button>
            </FlexContainer>
          </div>
        </Main.Footer>
      </Main.Content>
    </Main>
  )
}
