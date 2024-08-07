import { Router } from "express";
import organisationOperations  from '../controllers/organisationController'
const router=Router()

router.post('/neworg',organisationOperations.createOrganisation)
export default router