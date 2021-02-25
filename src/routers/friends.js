const express = require('express')
const router = express.Router()
const { verifyAccess } = require('../middlewares/auth');
const { getDataFriends, insertDataFriend } = require('../controllers/friends')


router
   .get('/', getDataFriends)
   .post('/', insertDataFriend)
module.exports = router