import { Router } from "express";
import roleOperations from "../controllers/roleController";
const router=Router()

router.post('/newrole',roleOperations.createRole)
router.post('/assignroletouser',roleOperations.assignRoleToUser)
export default router