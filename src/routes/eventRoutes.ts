import express from "express";
import { eventController } from "../controllers/eventController";
import RequiredRoles from "../middleware/required-role";
import { rolesEnum } from "../constants/roles";

const router = express.Router();

router.get(
  "/",
  RequiredRoles([
    rolesEnum.PARTICIPANT,
    rolesEnum.MANAGING_DIRECTOR,
    rolesEnum.PROMOTING_MANAGER,
    rolesEnum.EVENT_MANAGER,
    rolesEnum.FINANCE_MANAGER,
    rolesEnum.SALES_MANAGER,
  ]),
  eventController.getAllEvents
);

router.get(
  "/:id",
  RequiredRoles([
    rolesEnum.PARTICIPANT,
    rolesEnum.MANAGING_DIRECTOR,
    rolesEnum.PROMOTING_MANAGER,
  ]),
  eventController.getEventById
);

router.post(
  "/",
  RequiredRoles([
    rolesEnum.EVENT_MANAGER,
    rolesEnum.PROMOTING_MANAGER,
    rolesEnum.ADMIN,
  ]),
  eventController.createEvent
);

router.put(
  "/:id",
  RequiredRoles([rolesEnum.MANAGING_DIRECTOR, rolesEnum.PROMOTING_MANAGER]),
  eventController.updateEvent
);

router.put(
  "/:id/status",
  RequiredRoles([rolesEnum.ADMIN, rolesEnum.MANAGING_DIRECTOR]),
  eventController.updateEventStatus
);

router.delete("/:id", eventController.deleteEvent);

router.get(
  "/user/my-events",
  RequiredRoles([rolesEnum.PARTICIPANT]),
  eventController.getMyEvents
);

export const eventRoutes = router;
