const { actionQuery } = require('../helpers/helpers')

const messages = {
    getDataMessages: () => {
        return actionQuery(`SELECT m.id, m.senderId AS senderId, m.receiverId AS receiverId, u.photoProfile AS profileSender, us.photoProfile AS profileReceiver, u.name AS senderName, us.name AS receiverName, m.message, DATE_ADD(m.time, INTERVAL 7 HOUR) AS time  
        FROM messages AS m
        INNER JOIN users AS u ON u.id = m.senderId
        INNER JOIN users AS us ON us.id = m.receiverId
        ORDER BY time ASC`)
    },
    insertDataMessage: (data) => {
        return actionQuery('INSERT INTO messages SET ?', data)
    },
}

module.exports = messages