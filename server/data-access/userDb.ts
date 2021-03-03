const makeUserDb = ({ getDb }) => {
  const createOrUpdateUser = async userDetails => {
    const { result: surveyResult, ...primaryDetails } = userDetails
    const params = surveyResult ? {
      $set: { ...primaryDetails },
      $push: {
        [`survey.${userDetails.surveyId}`]: {
          $each: [{ result: surveyResult, at: Date.now() }],
          $position: 0
        }
      }
    } : {
      $set: { ...primaryDetails }
    }
    const db = await getDb()
    const result = await db
      .collection('users')
      .findOneAndUpdate(
        { email: userDetails.email },
        params,
        { upsert: true, returnOriginal: false, projection: { _id: 1, email: 1, passwordGenerated: 1 } }
      )
    const { _id: id, email } = result.value || {}
    return result.ok === 1 ? { id, email } : null
  }
  const updateUser = async userDetails => {
    const db = await getDb()
    const result = await db
      .collection('users')
      .updateOne({ email: userDetails.email }, { $set: { ...userDetails } })

    return result.modifiedCount === 1
  }

  const getUser = async (email, projections = {}) => {
    const db = await getDb()
    const user = await db.collection('users').findOne({ email }, { projection: { displayName: 1, email: 1, googleId: 1, facebookId: 1, ...projections } })
    return user
  }

  return Object.freeze({
    getUser,
    updateUser,
    createOrUpdateUser
  })
}

export default makeUserDb
