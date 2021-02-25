const express = require('express')
const router = express.Router()
const { verifyAccess } = require('../middlewares/auth');
const { getDataMessages, insertDataMessage } = require('../controllers/messages')


router
   .get('/', verifyAccess, getDataMessages)
   .post('/', verifyAccess, insertDataMessage)
module.exports = router