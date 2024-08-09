import { Router } from "express";
import userOperations from "../controllers/userController";
const router=Router()

router.get('/allusers',userOperations.getAllUsers)
router.post('/admininvite',userOperations.adminUserInvite)
router.post('/newuser',userOperations.newUser)
export default router