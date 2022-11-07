import express from 'express';

//controllers
import {
  createCalendarNoteController,
  updateCalendarNoteController,
  deleteCalendarNoteController,
  getCalendarNoteController,
  getCalendarNotesController,
} from '../controllers/calendar/calendar.controller';

//schema
import {
  createCalendarSchema,
  deleteCalendarSchema,
  getCalendarSchema,
  updateCalendarSchema,
} from '../schema/calendar/calendar.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/schema.middleware';

const router = express.Router();

router.get(
  '/:calendarId',
  [requireUser, validateSchema(getCalendarSchema)],
  getCalendarNoteController
);

router.get('/', requireUser, getCalendarNotesController);

router.post(
  '/',
  [requireUser, validateSchema(createCalendarSchema)],
  createCalendarNoteController
);

router.put(
  '/:calendarId',
  [requireUser, validateSchema(updateCalendarSchema)],
  updateCalendarNoteController
);

router.delete(
  '/:calendarId',
  [requireUser, validateSchema(deleteCalendarSchema)],
  deleteCalendarNoteController
);

export default router;
