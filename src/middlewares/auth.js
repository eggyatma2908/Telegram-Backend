const jwt = require('jsonwebtoken')
const helper = require('../helpers/helpers')

exports.verifyAccess = (req, res, next) => {
  const authorization = req.headers.authorization
  if (!authorization) {
    return helper.responseError(res, null, 401, {
      message: 'Server, need token'
    })
  }

  let token = authorization.split(' ')
  token = token[1]

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, function (err, decoded) {
    if (err) {
      if (err.name === 'JsonWebTokenError') {
        return helper.responseError(res, null, 401, {
          message: 'Invalid token'
        })
      } else if (err.name === 'TokenExpiredError') {
        return helper.responseError(res, null, 401, {
          message: 'Token expired'
        })
      }
    }
    req.userID = decoded.userID
    req.roleID = decoded.roleID
    next()
  })
}
