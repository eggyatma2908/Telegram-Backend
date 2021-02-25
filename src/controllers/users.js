const modelUsers = require('../models/users')
const helper = require('../helpers/helpers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const { pagination } = require('../helpers/pagination')
const sendEmail = require('../helpers/sendEmail')

const users = {
    registerUser: (req, res) => {
        const id = uuidv4()
        const {
          name,
          email,
          password
        } = req.body
    
        modelUsers.checkUser(email)
          .then((result) => {
            if (result.length > 0) return helper.responseError(res, null, 401, { message: 'Email already exist' })
            bcrypt.genSalt(10, function (err, salt) {
              bcrypt.hash(password, salt, function (err, hash) {
                const data = {
                  id,
                  name,
                  email,
                  password: hash,
                  createdAt: new Date()
                }
                modelUsers.insertDataUser(data)
                  .then(() => {
                    return helper.responseOk(res, { message: 'Register successfuly' }, 200, null)
                  })
              })
            })
          })
      },
      loginUser: (req, res) => {
        const { email, password } = req.body
        modelUsers.checkUser(email)
          .then((result) => {
            const user = result[0]
            if (result.length === 0) {
              return helper.responseError(res, null, 401, { error: 'Email has not been registered' })     
            }
            if (parseInt(user.emailVerification) === 0) {
              return helper.responseError(res, null, 401, { error: 'Email has not been verified' })
            }
    
            bcrypt.compare(password, user.password, function (err, resCheck) {
              if (resCheck === false) return helper.responseError(res, null, 401, { error: 'Password wrong' })
              delete user.password
              delete user.roleID
              delete user.updatedAt
              delete user.createdAt
              // accessToken 
              jwt.sign({ userId: user.id, email: user.email }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '24h' }, function (err, accessToken) {
              // refreshtoken  
              jwt.sign({ userId: user.id, email: user.email }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '48h' }, function (err, refreshToken) {
                  user.accessToken = accessToken
                  user.refreshToken = refreshToken
                return helper.responseOk(res, user, 200, null)
                })
              })
            })
          })
      },
      sendEmailVerification: (req, res, next) => {
        const email = req.body.email
        if(!email) {
            helper.responseError(res, null, 404, { message: 'Forbidden: message and email cannot be empty' })
        }
        try {
          sendEmail(email)
          return next()
        } catch (error) {
            helper.responseError(res, null, 500, { message: 'Looks like server having trouble..' })
        }
      },
      getDataUsers: async (req, res) => {
        const name = req.query.name
        const email = req.query.email
        const sortData = req.query.sort || 'id'
        const typeSort = req.query.type || 'ASC'
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 4
        const offset = (page - 1) * limit
        const setPagination = await pagination(limit, page)
        modelUsers.getDataUsers(name, email, offset, limit)
          .then(result => {
            const resultUser = result
            const error = {
              message: 'Error not found'
            }
            // client.setex("allUsers", 60*60, JSON.stringify(resultUser));
            if (resultUser.length === 0) {
              return helper.responseError(res, null, 404, error)
            }
            helper.responseOk(res, { pagination: setPagination, users: resultUser }, 200, null)
          })
          .catch((err) => {
            console.log(err)
            return helper.responseError(res, null, 500, { message: 'Internal server error' })
          })
      },
      getDataUserById: (req, res) => {
        const id = req.params.id
        modelUsers.getDataUserById(id)
          .then(result => {
            const resultUser = result
            const error = {
              message: 'Id not found'
            }
            if (resultUser.length === 0) {
              return helper.responseError(res, null, 404, error)
            }
            helper.responseOk(res, resultUser, 200, null)
          })
          .catch(() => {
            return helper.responseError(res, null, 500, { message: 'Internal server error' })
          })
      },
      updateProfile: (req, res, next) => {
        const id = req.params.id
        const data = {
          photoProfile: `${process.env.BASE_URL}/upload/${req.file.filename}`,
          updatedAt: new Date()
        }
        modelUsers.updateProfile(id, data)
        .then(result => {
          const resultUser = result
          helper.responseOk(res, { photoProfile: data.photoProfile, resultUser}, 200, null)
        })
        .catch(err => {
          console.log(err)
          helper.responseError(res, null, 500, { message: 'Internal server error' })
        })
      },
      updatePhone: (req, res, next) => {
        const id = req.params.id
      
        const { phoneNumber } = req.body
        
        const data = {
          phoneNumber,
          updatedAt: new Date()
        }
        modelUsers.updatePhone(id, data)
        .then(result => {
          const resultUser = result
          helper.responseOk(res, resultUser, 200, null)
        })
        .catch(err => {
          console.log(err)
          helper.responseError(res, null, 500, { message: 'Internal server error' })
        })
      },
      updateUsername: (req, res, next) => {
        const id = req.params.id
      
        const { username } = req.body
        
        const data = {
          username,
          updatedAt: new Date()
        }
        modelUsers.updateUsername(id, data)
        .then(result => {
          const resultUser = result
          helper.responseOk(res, resultUser, 200, null)
        })
        .catch(err => {
          console.log(err)
          helper.responseError(res, null, 500, { message: 'Internal server error' })
        })
      },
}

module.exports = users