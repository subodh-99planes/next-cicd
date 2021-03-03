import * as express from 'express'
import { GenericObject } from './utilTypes'

/** High level user survey data type. */
export interface UserSurveyData {
  email?: string
  surveyId: string
  uid: string
  result: { [key: string]: unknown }
}

/** Survey structure. */
export interface SurveyDetails {
  id: string
  title: string
  modifiedOn: number
  pages: SurveyData['pages']
}

export interface CompoundSurveyDetails {
  id: string
  title: string
  modifiedOn: number
  pages: SurveyData['pages']
  baseSurveyId: string
}

export interface UserDetails {
  email: string
  createdOn: number
  lastUpdated: number
  surveyId?: string
  answers?: [GenericObject]
  name?: string
  facebookId?: string
  googleId?: string
  source: GenericObject
  password?: string
}

export interface ExpressRequest extends express.Request {
  user?: GenericObject
  logout?: () => void
}

export interface SurveyElement {
  type: 'dropdown' | 'radiogroup'
  name: string
  title: string
  description: string
  choices?: Array<{ value: string; text: string }>
  isRequired?: boolean
}

export interface SurveyPage {
  name: string
  title: string
  description?: string
  elements: SurveyElement[]
  surveyId: string
}

export interface SurveyData {
  pages: SurveyPage[]
}

export type Color = 'yellow' | 'red' | 'blue' | 'purple' | 'default'
