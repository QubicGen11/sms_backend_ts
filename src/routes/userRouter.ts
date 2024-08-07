import { Router } from "express";
import userOperations from "../controllers/userController";
const router=Router()

router.get('/allusers',userOperations.getAllUsers)
export default router