import { Router } from "express";
import featureOperations from "../controllers/featuredController";
const router=Router()
router.get('/allfeatures',featureOperations.getAllFeatures)
export default router