require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const PORT = process.env.PORT
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const helper = require('./src/helpers/helpers')
const usersRoute = require('./src/routers/users')
const friendsRoute = require('./src/routers/friends')
const emailRoute = require('./src/routers/email')
const messagesRoute = require('./src/routers/messages')
const messageModel = require('./src/models/messages')
const { v4: uuidv4 } = require('uuid')
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

io.on ('connection', (socket) => {
  console.log('Client connect' + socket.id)

  socket.on('userJoin', id => {
    console.log(id + ' Has been join')
    socket.join('user' + id)
  })

  socket.on('privateMessage', (data, cb) => {
    const id = uuidv4()
    const dataMessage = {
      id,
      message: data.message,
      senderId: data.senderId,
      receiverId: data.receiverId,
      createdAt: new Date()
    }
    const dataSender = {
      message: data.message,
      senderId: data.senderId,
      receiverId: data.receiverId,
      createdAt: new Date(),
      profileSender: data.profileSender
    }
    cb(dataSender)
    messageModel.insertDataMessage(dataMessage)
    .then(res => {
      console.log(res, 'APAKAH DISINI')
      io.to('user' + data.receiverId).emit('receiverMessage', data)
    })
    .catch(err => {
      console.log(err, 'APAKAH DISINI')
    })
  })
  
  socket.on('disconnect', () => {
    console.log('Client disconnect' + socket.id);
  })
})

app.use('/v1/messages', messagesRoute)
app.use('/v1/users', usersRoute)
app.use('/v1/friends', friendsRoute)
app.use('/v1/emailVerification', emailRoute)
app.use('/upload', express.static('./uploads'))

app.use('*', (req, res) => {
  const error = {
    message: 'URL not found'
  }
  helper.responseError(res, null, 404, error)
})

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
})