import express from 'express'
import { signup, login, userVerification } from '../controllers/auth'
import { createCustomerIfNull, updatePlan, cancelPlan } from '../controllers/payment'
import { dashboardUser } from '../controllers/user'

const mainRouter = express.Router()

mainRouter.post('/auth/signup', signup)
mainRouter.post('/auth/login', login)
mainRouter.post('/auth/jwt', userVerification)

mainRouter.get('/user', dashboardUser)
mainRouter.post('/user/payment', createCustomerIfNull)
mainRouter.post('/user/update-plan', updatePlan)
mainRouter.post('/user/cancel-plan', cancelPlan)

module.exports = mainRouter