import express from 'express'
import { pictureOfTheDay, marsPhotos, asteroidsNearEarth, apiMiddleware } from '../controllers/apiRequests'

const apiRouter = express.Router()

apiRouter.get('/near-earth-asteroids', apiMiddleware, asteroidsNearEarth)
apiRouter.get('/picture-of-the-day', apiMiddleware, pictureOfTheDay)
apiRouter.get('/mars-rover-photos', apiMiddleware, marsPhotos)

module.exports = apiRouter