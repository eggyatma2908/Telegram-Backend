const modelFriend= require('../models/friends')
const helper = require('../helpers/helpers')
const { v4: uuidv4 } = require('uuid')

const friends = {
    getDataFriends: (req, res) => {
        modelFriend.getDataFriends()
          .then(result => {
            const resultFriend= result
            console.log(resultFriend)
            const error = {
              message: 'Error not found'
            }
            if (resultFriend.length === 0) {
              helper.responseError(res, null, 404, error)
            }
            helper.responseOk(res, resultFriend, 200, null)
          })
          .catch((err) => {
            return helper.responseError(res, null, 500, { message: 'Internal server error' })
          })
      },
      insertDataFriend: (req, res) => {
        const id = uuidv4()
        const { userId, friendId } = req.body
        modelFriend.checkFriend(friendId)
          .then(result => {
            const resultFriend = result
            if (resultFriend.filter(e => e.userId.match(userId)).length > 0) return helper.responseError(res, null, 401, { message: 'Friend already exist' })
            const data = {
              id,
              userId,
              friendId
            }
            modelFriend.insertDataFriend(data)
            modelFriend.getDataFriends()
            .then(results => {
              const friends = results
              console.log(friends)
            helper.responseOk(res, friends, 200, null)              
          })
          })
          .catch((err) => {
            return helper.responseError(res, null, 500, { message: 'Internal server error' })
          })
      }
}

module.exports = friends