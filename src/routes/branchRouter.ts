import { Router } from "express";
import { createBranch,getBranchByOrganisation } from "../controllers/branchController";
const router=Router()

router.post('/newBranch',createBranch)
router.get('/branches/:orgname',getBranchByOrganisation)
export default router