import { Router } from "express";
import { createnewAccessGroup } from "../controllers/groupController";

const router=Router()

router.post('/newgroup',createnewAccessGroup)

export default router