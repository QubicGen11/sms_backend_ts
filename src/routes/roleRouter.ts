import { Router } from "express";
import {createNewRole,updateRole,deleteRole, getRoles} from '../controllers/roleController'
const router=Router()

router.post('/newRole',createNewRole)
router.post('/updateRole',updateRole)
router.delete('/deleteRole',deleteRole)
router.get('/allroles',getRoles)
export default router