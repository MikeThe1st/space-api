import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
var cookieParser = require('cookie-parser')
const mainRouter = require('../routes/main.ts')
const apiRouter = require('../routes/api.ts')

dotenv.config()
const app = express()
const apiApp = express()
const appPort = process.env.APP_PORT || 3000
const apiPort = process.env.API_PORT || 4000
const mongoURL = process.env.MONGO_URL

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: 'GET,POST,DELETE,PUT,PATCH,OPTIONS',
  credentials: true,
}

app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(cors(corsOptions))

apiApp.use(cors())



app.use('/backend', mainRouter)
apiApp.use('/api', apiRouter)


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
    apiApp.listen(apiPort, () => console.log(`Api is running on Port: ${apiPort}`))
  } catch (error) {
      console.log(error)
  }
}

start()
