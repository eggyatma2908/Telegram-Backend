const { actionQuery } = require('../helpers/helpers')

const users = {
    checkUser: (email) => {
      return actionQuery('SELECT * FROM users WHERE email = ?', email)
    },
    countUsers: () => {
      return actionQuery('SELECT COUNT(*) AS totalData FROM users')
    },
    getDataUsers: (name, email) => {
      if (name) {
        return actionQuery('SELECT * FROM users WHERE username LIKE ?', `%${name}%`)
      } else if (email) {
        return actionQuery('SELECT * FROM users WHERE phoneNumber LIKE ?', `%${email}%`)
      } else {
        return actionQuery(`SELECT * FROM users `)
      }
    },
    getDataUserById: (id) => {
      return actionQuery('SELECT * FROM users WHERE id = ?', id)
    },
    insertDataUser: (data) => {
      return actionQuery('INSERT INTO users SET ?', data)
    },
    updateProfile: (id, data) => {
      return actionQuery(`UPDATE users SET ? WHERE id = ?`, [data, id])
    },
    updatePhone: (id, data) => {
      return actionQuery(`UPDATE users SET ? WHERE id = ?`, [data, id])
    },
    updateUsername: (id, data) => {
      return actionQuery(`UPDATE users SET ? WHERE id = ?`, [data, id])
    },
}

module.exports = users