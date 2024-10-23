import * as express from 'express'

const userRoutes = express.Router()

import { checkLoginAccount, createUser, checkDataUserExists, getInformationUserByIDController } from '../controllers/userController'

userRoutes.post('/user-login', checkLoginAccount)
userRoutes.post('/add-user', createUser)
userRoutes.post('/check-data-user-exists', checkDataUserExists)
userRoutes.get('/get-information-user-by-id', getInformationUserByIDController)

export { userRoutes }