import { Router } from "express";
import { getAllFeatures, insertDefaultFeatures } from "../controllers/featuredController";

const router=Router()

router.post('/insertfeatures',insertDefaultFeatures)
router.get('/allfeatures',getAllFeatures)
export default router