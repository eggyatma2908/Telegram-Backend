const sendEmail = require('../helpers/sendEmail')
const emailModel = require('../models/email')
const helper = require('../helpers/helpers')

class Controller {

  sendEmailVerification(req, res) {
    const email = req.body.email
    // const name = req.body.name
    if (!email) {
        helper.responseError(res, null, 404, { message: 'Forbidden: message and email cannot be empty' })
    }

    sendEmail(email)
      .then(() => {
        helper.responseOk(res, { message: 'Successfully sent the verification email' }, 200, null)
      })
      .catch(() => {
        helper.responseError(res, null, 500, { message: 'Looks like server having trouble..' })
      })
  }

  emailVerification(req, res, next) {
    const email = req.body.email
    if (!email) {
        helper.responseError(res, null, 400, { message: 'Email cannot be empty' })
    }
    emailModel.checkEmailStatus(email)
      .then(results => {
        const emailVerification = results[0].emailVerification
        if (emailVerification === 1) {
            helper.responseError(res, null, 404, { message: 'Forbidden' })
        } else if (emailVerification === 0) {
          emailModel.emailVerification(email)
            .then(() => {
              helper.responseOk(res, { message: 'Your email was successfully verified' }, 200, null)
            })
            .catch(() => {
              helper.responseError(res, null, 500, { message: 'Looks like server having trouble..' })
            })
        }
      })
      .catch(() => {
        helper.responseError(res, null, 500, { message: 'Looks like server having trouble..' })
      })
  }

  checkEmailVerified(req, res, next) {
    const email = req.headers.email
    emailModel.checkEmailStatus(email)
      .then(results => {
        if (results.length === 0) {
          helper.responseError(res, null, 404, { message: 'Forbidden: You are not user' })
        }
        if (results.length === 1) {
          helper.responseOk(res, { message: 'Your email was successfully verified' }, 200, null)
        }
      })
      .catch(() => {
        helper.responseError(res, null, 500, { message: 'Looks like server having trouble..' })
      })
  }
}
const Email = new Controller()
module.exports = Email