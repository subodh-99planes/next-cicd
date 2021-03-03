import chai from 'chai'
import chaiHttp from 'chai-http'
const port = process.env.PORT || 3000
const baseUrl = `localhost:${port}`
chai.use(chaiHttp)

const expect = chai.expect

describe('Fetching the primary survey function', () => {
  it('should return the primary survey', () => {
    chai.request(baseUrl)
      .get('/survey')
      // eslint-disable-next-line handle-callback-err
      .end(function (err, res) {
        expect(res).to.have.status(200)
        expect(res.body.statusCode).to.equal(200)
        expect(res.body.body).to.be.an('array')
        expect(err).to.equal(null)
      })
  })
})
