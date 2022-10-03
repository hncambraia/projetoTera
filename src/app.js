const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv-safe').config();

const db = require('./config/database')
const userRoutes = require('./routes/userRoutes')
const feedRoutes = require('./routes/feedRoutes')

db.connect() 

app.use(cors())
app.use(express.json())
app.use("/usuarios", userRoutes)
app.use("/feed", feedRoutes)

module.exports = app