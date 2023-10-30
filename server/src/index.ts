import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
var cookieParser = require('cookie-parser')
const mainRouter = require('../routes/main.ts')

dotenv.config()
const app = express()
const appPort = process.env.APP_PORT || 3000
const mongoURL = process.env.MONGO_URL

const corsOptions = {
  origin: ['https://space-api-app.onrender.com', 'http://localhost:5173'],
  methods: 'GET,POST,DELETE,PUT,PATCH,OPTIONS',
  credentials: true,
}

app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions))

app.use('/backend', mainRouter)

const start = async () => {
  try {
   // Connect to MongoDB
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as Parameters<typeof mongoose.connect>[1])
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    })
    app.listen(appPort, () => console.log(`App is running on Port: ${appPort}`))
  } catch (error) {
      console.log(error)
  }
}

start()
