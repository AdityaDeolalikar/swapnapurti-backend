import { Router } from "express";
import { locationController } from "../controllers/locationController";

const router = Router();

router.get("/", locationController.getAllLocations);

router.get("/:id", locationController.getLocationById);

router.post("/", locationController.createLocation);

router.put("/:id", locationController.updateLocation);
router.delete("/:id", locationController.deleteLocation);

export default router;
