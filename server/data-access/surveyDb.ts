import { surveyPublicFields } from '../../utils/survey/surveyPublicFields'
import { GenericObject } from '../../utils/utilTypes'

const mapFieldsToProjection = (fields : Array<string>) => fields.reduce((o: GenericObject, k : string) => ({ [k]: 1, ...o }), {})

const makeSurveyDb = ({ getDb }) => {
  const getPrimary = async () => {
    const db = await getDb()
    const { _id: id, pages, ...surveyDetails } = await db.collection('surveys').findOne({ primary: true }, { projection: mapFieldsToProjection(surveyPublicFields) })
    return { id, pages: pages.map(d => ({ ...d, surveyId: id })), ...surveyDetails }
  }
  const getById = async id => {
    const db = await getDb()
    const result = await db.collection('surveys').findOne({ _id: id, active: true, urlAccessible: true }, { projection: mapFieldsToProjection(surveyPublicFields) })
    if (!result) {
      return null
    }
    return { ...result, pages: result.pages.map(d => ({ ...d, surveyId: result._id })) }
  }
  const incrementTakes = async (_id: string) => {
    const db = await getDb()
    const result = await db
      .collection('surveys')
      .updateOne({ _id }, { $inc: { takes: 1 } })
    return result.modifiedCount > 0 ? { id: _id, } : null
  }

  return Object.freeze({
    getPrimary,
    getById,
    incrementTakes
  })
}

export default makeSurveyDb
