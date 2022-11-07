import { Request, Response } from 'express';
import {
  CreateCalendarInput,
  UpdateCalendarInput,
  DeleteCalendarInput,
  GetCalendarInput,
} from '../../schema/calendar/calendar.schema';
import {
  createCalendarNote,
  deleteCalendarNote,
  getAndUpdateCalendarNote,
  getCalendarNote,
  getCalendarNotes,
} from '../../services/calendar/calendar.service';

import CalendarModel from '../../models/calendar/calendar.model';

export async function createCalendarNoteController(
  req: Request<{}, {}, CreateCalendarInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const calendarNote = await createCalendarNote({
    ...body,
    user: userId,
  });

  return res.send(calendarNote);
}

export async function updateCalendarNoteController(
  req: Request<UpdateCalendarInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const calendarNoteId = req.params.calendarId;
  const update = req.body;

  const calendarNote = await getCalendarNote({
    _id: calendarNoteId,
  });

  if (!calendarNote) {
    return res.sendStatus(404);
  }

  if (String(calendarNote.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedCalendarNote = await getAndUpdateCalendarNote(
    { _id: calendarNoteId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedCalendarNote);
}

export async function getCalendarNoteController(
  req: Request<GetCalendarInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const calendarNoteId = req.params.calendarId;
  const calendarNote = await getCalendarNote({
    _id: calendarNoteId,
  });

  if (!calendarNote) {
    return res.sendStatus(404);
  }

  if (String(calendarNote.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(calendarNote);
}

export async function getCalendarNotesController(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const calendarNotes = await getCalendarNotes({ user: userId });

  if (!calendarNotes) {
    return res.sendStatus(404);
  }

  return res.send(calendarNotes);
}

export async function deleteCalendarNoteController(
  req: Request<DeleteCalendarInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const calendarNoteId = req.params.calendarId;

  const calendar = await getCalendarNote({
    _id: calendarNoteId,
  });

  if (!calendar) {
    return res.sendStatus(404);
  }

  if (String(calendar.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteCalendarNote({ _id: calendarNoteId });

  return res.sendStatus(200);
}
