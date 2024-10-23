import * as express from 'express'

import { allProvince, allDistrict, allWard } from '../controllers/divisionController'

const divisionRoutes = express.Router()

divisionRoutes.get('/all-province', allProvince)
divisionRoutes.get('/all-district-by-province', allDistrict)
divisionRoutes.get('/all-ward-by-district-province', allWard)

export { divisionRoutes }