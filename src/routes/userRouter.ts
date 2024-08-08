import { Router } from "express";
import userOperations from "../controllers/userController";
const router=Router()

router.get('/allusers',userOperations.getAllUsers)
router.post('/admininvite',userOperations.adminUserInvite)
export default router