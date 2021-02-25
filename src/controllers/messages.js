const modelMessage = require('../models/messages')
const helper = require('../helpers/helpers')
const { v4: uuidv4 } = require('uuid')

const messages = {
    getDataMessages: (req, res) => {
        modelMessage.getDataMessages()
          .then(result => {
            const resultMessage = result
            console.log(resultMessage)
            helper.responseOk(res, resultMessage, 200, null)
          })
          .catch((err) => {
            console.log(err)
            return helper.responseError(res, null, 500, { message: 'Internal server error' })
          })
      },
      insertDataMessage: (req, res) => {
        console.log(req)
        console.log(res)
        const id = uuidv4()
        const { senderId, receiverId, message } = req.body
        const data = {
          id,
          senderId, 
          receiverId,
          message,
          time: new Date()
        }
        modelMessage.insertDataMessage(data)
        console.log(data)
          .then(result => {
            const resultMessage = result
            const error = {
              message: 'Error not found'
            }
            if (data.senderId === receiverId) {
              return helper.responseError(res, null, 404, error)
            }
            helper.responseOk(res, resultMessage, 200, null)
          })
          .catch((err) => {
            console.log(err)
            return helper.responseError(res, null, 500, { message: 'Internal server error' })
          })
      }
}

module.exports = messages