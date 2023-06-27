import {Router} from 'express'
import users from './users.routes.js'


const router=Router()
router.use('/users',users)
export default router;