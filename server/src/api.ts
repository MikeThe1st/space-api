import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
const apiRouter = require('../routes/api.ts')

dotenv.config()
const apiApp = express()
const apiPort = process.env.API_PORT || 4000
const mongoURL = process.env.MONGO_URL

apiApp.use(cors())
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
    apiApp.listen(apiPort, () => console.log(`Api is running on Port: ${apiPort}`))
  } catch (error) {
      console.log(error)
  }
}

start()
