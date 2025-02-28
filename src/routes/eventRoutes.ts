import express from "express";
import { eventController } from "../controllers/eventController";

const router = express.Router();

// Public routes
router.get("/", eventController.getAllEvents);
router.get("/admin", eventController.getAllEvents);
//@ts-ignore
router.get("/:id", eventController.getEventById);

// Protected routes
// router.use(auth)
//@ts-ignore
router.post("/", eventController.createEvent);
//@ts-ignore
router.put("/:id", eventController.updateEvent);
//@ts-ignore
router.put("/:id/status", eventController.updateEventStatus);
//@ts-ignore
router.delete("/:id", eventController.deleteEvent);
//@ts-ignore
router.get("/user/my-events", eventController.getMyEvents);

export const eventRoutes = router;
