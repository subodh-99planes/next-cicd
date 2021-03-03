import { compoundSurveyPublicFields } from '../../utils/survey/compoundSurveyPublicFields'
import { GenericObject } from '../../utils/utilTypes'

const mapFieldsToProjection = (fields : Array<string>) => fields.reduce((o: GenericObject, k : string) => ({ [k]: 1, ...o }), {})

const makeCompoundSurveyDb = ({ getDb }) => {
  const getById = async id => {
    const db = await getDb()
    const result = await db.collection('compoundSurveys').aggregate([
      { $match: { _id: id, urlAccessible: true, active: true } },
      {
        $lookup: {
          from: 'surveys',
          localField: 'baseSurveyId',
          foreignField: '_id',
          as: 'survey'
        }
      }, {
        $project: {
          ...mapFieldsToProjection(compoundSurveyPublicFields),
          baseSurvey: {
            $arrayElemAt: ['$survey', 0]
          }
        }
      }]).toArray()
    if (!result.length) {
      return null
    }
    const { baseSurvey, ...rest } = result[0]
    return { ...rest, pages: baseSurvey.pages.map(d => ({ ...d, surveyId: baseSurvey._id })).concat(rest.pages.map(d => ({ ...d, surveyId: rest._id }))) }
  }
  const incrementTakes = async (_id: string) => {
    const db = await getDb()
    const result = await db
      .collection('compoundSurveys')
      .updateOne({ _id }, { $inc: { takes: 1 } })
    return result.modifiedCount > 0 ? { id: _id, } : null
  }

  return Object.freeze({
    getById,
    incrementTakes
  })
}

export default makeCompoundSurveyDb
