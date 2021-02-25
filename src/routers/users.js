const express = require('express');
const router = express.Router();
const { registerUser, loginUser, sendEmailVerification, getDataUsers, getDataUserById, updateProfile, updatePhone, updateUsername } = require('../controllers/users.js');
const { uploadMulter } = require('../middlewares/upload')
const { verifyAccess } = require('../middlewares/auth');

router
  .get('/', getDataUsers)
  .get('/:id', verifyAccess, getDataUserById)
  .post('/register', sendEmailVerification, registerUser)
  .post('/login', loginUser)
  .patch('/profile/:id', uploadMulter.single('photoProfile'), updateProfile)
  .patch('/phonenumber/:id', updatePhone)
  .patch('/username/:id', updateUsername)
module.exports = router