import Router from 'express'
import Authentication from '../controllers/authenticationController'
const router=Router()

router.post('/login',Authentication.userLogin)

export default router
