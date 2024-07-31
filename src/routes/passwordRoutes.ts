import { Express } from "express";
import { Router } from "express";
import {sendResetCode,changePassword} from '../controllers/changePasswordController'
const router=Router()

router.post('/sendEmail',sendResetCode)
router.post('/changePassword',changePassword)

export default router