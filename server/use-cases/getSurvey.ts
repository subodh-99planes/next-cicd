const makeGetSurvey = ({ surveyDb }) => {
  return async () => {
    const survey = await surveyDb.getPrimary()
    return survey
  }
}

const makeGetSurveyById = ({ surveyDb, compoundSurveyDb }) => {
  return async (surveyId: string) => {
    let survey = await compoundSurveyDb.getById(surveyId)
    if (!survey) {
      survey = await surveyDb.getById(surveyId)
    }
    if (!survey) {
      return { error: true }
    }
    const { _id: id, ...surveyDetails } = survey
    return { id, ...surveyDetails }
  }
}

export { makeGetSurvey, makeGetSurveyById }
