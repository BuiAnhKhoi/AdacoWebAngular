import * as express from 'express'

import { addNewContact } from '../controllers/contactController'

const contactRoutes = express.Router()

contactRoutes.post('/add-support', addNewContact)

export { contactRoutes }

