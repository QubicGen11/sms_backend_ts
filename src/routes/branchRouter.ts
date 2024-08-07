import { Router } from "express";
import branchOperations from "../controllers/branchController";
const router=Router()

router.post('/newbranch',branchOperations.createOrganisation)
export default router