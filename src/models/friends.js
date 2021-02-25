const { actionQuery } = require('../helpers/helpers')

const friends = {
    checkFriend: (friendId) => {
        return actionQuery('SELECT * FROM friends WHERE friendId = ?', friendId)
      },
    getDataFriends: () => {
        return actionQuery(`SELECT f.userId, f.friendId, u.name, u.photoProfile
        FROM friends AS f
        INNER JOIN users AS u ON u.id = f.friendId`
        )
    },
    insertDataFriend: (data) => {
        return actionQuery('INSERT INTO friends SET ?', data)
    },
}

module.exports = friends