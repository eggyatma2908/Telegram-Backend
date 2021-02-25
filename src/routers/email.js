const express = require('express')
const router = express.Router()
const emailController = require('../controllers/email')
// const sendEmail = require('../helpers/email')
const {emailVerification, sendEmailVerification, checkEmailVerified} = emailController

router
.post('/sendemailverification',sendEmailVerification)
.patch('/emailverification',emailVerification)
.get('/checkEmailVerified',checkEmailVerified)
module.exports = router