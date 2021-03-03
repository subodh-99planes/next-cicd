import _ from 'lodash'

export const compoundSurveyPublicFields = ['id', 'title', 'modifiedOn', 'pages', 'baseSurveyId']

const getCompoundPublicFields = compoundSurveyObj => _.pick(compoundSurveyObj, compoundSurveyPublicFields)

export default getCompoundPublicFields
