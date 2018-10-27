const Sequelize  = require('sequelize');
const db = require('../db')
const crypto = require('crypto')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
   type: Sequelize.STRING
  }

}, {
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }
});


//instance method returns true or false for if the entered password matches
User.prototype.correctPassword = function(candidatePassword) {
  return User.encryptPassword(candidatePassword, this.salt()) === this.password()
}

// class method generates a random salt
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

//accepts a plain text password and a salt, and returns its hash
User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

//salt and hash when the user enters their password for the first time and again whenever they change it
function setSaltAndPassword(user) {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

module.exports = User;
