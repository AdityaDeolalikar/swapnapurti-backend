import { Router } from "express";
import { locationController } from "../controllers/locationController";
// import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/", locationController.getAllLocations.bind(locationController));
//@ts-ignore
router.get("/:id", locationController.getLocationById.bind(locationController));
//@ts-ignore
router.post("/", locationController.createLocation.bind(locationController));
//@ts-ignore
router.put("/:id", locationController.updateLocation.bind(locationController));
router.delete(
  "/:id",
  //@ts-ignore
  locationController.deleteLocation.bind(locationController)
);

export default router;
