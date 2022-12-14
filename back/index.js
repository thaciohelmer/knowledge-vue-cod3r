const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')

require('./config/mongodb')

app.db = db
app.mongoose = mongoose

consign()
  .then('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./api/validation.js')
  .then('./api')
  .then('./schedule/startSchedule.js')
  .then('./config/routes.js')
  .into(app)

app.listen(3000, () => {
  console.log('Backend executando...');
})