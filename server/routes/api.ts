import express from 'express'
import { pictureOfTheDay, marsPhotos, asteroidsNearEarth, apiMiddleware, testApi } from '../controllers/apiRequests'

const apiRouter = express.Router()

apiRouter.get('/near-earth-asteroids', apiMiddleware, asteroidsNearEarth)
apiRouter.get('/picture-of-the-day', apiMiddleware, pictureOfTheDay)
apiRouter.get('/mars-rover-photos', apiMiddleware, marsPhotos)
apiRouter.get('/test', testApi)

module.exports = apiRouter