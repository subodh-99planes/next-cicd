import _ from 'lodash'

export const surveyPublicFields = ['id', 'title', 'modifiedOn', 'pages']

const getPublicFields = surveyObj => _.pick(surveyObj, surveyPublicFields)

export default getPublicFields
