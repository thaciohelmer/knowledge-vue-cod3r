const mongoose = require('mongoose')
const { mongoDbConfig } = require('../.env')

const DB_NAME = mongoDbConfig.database
const DB_USER = mongoDbConfig.user
const DB_PASSWORD = encodeURIComponent(mongoDbConfig.password)

const msg = 'ERRO! Não foi possível conectar com o MongoDB!'

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.j7otd2w.mongodb.net/?retryWrites=true&w=majority`)
  .catch(e => {
    console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m');
  })