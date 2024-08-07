import { Router } from "express";
import roleOperations from "../controllers/roleController";
const router=Router()

router.post('/newrole',roleOperations.createRole)
router.post('/assignroletouser',roleOperations.assignRoleToUser)
router.get('/allroles',roleOperations.getAllRoles)
export default router