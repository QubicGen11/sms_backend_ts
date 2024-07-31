import { Router } from "express";
import {createNewOrganisation,checkExistingOrganisation} from "../controllers/organisationController";
const router=Router()

router.post('/newOrganisation',createNewOrganisation)
router.post('/checkOrg',checkExistingOrganisation)

export default router