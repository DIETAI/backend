"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCalendarNoteController = exports.getCalendarNotesController = exports.getCalendarNoteController = exports.updateCalendarNoteController = exports.createCalendarNoteController = void 0;
const calendar_service_1 = require("../../services/calendar/calendar.service");
function createCalendarNoteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const calendarNote = yield (0, calendar_service_1.createCalendarNote)(Object.assign(Object.assign({}, body), { user: userId }));
        return res.send(calendarNote);
    });
}
exports.createCalendarNoteController = createCalendarNoteController;
function updateCalendarNoteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const calendarNoteId = req.params.calendarId;
        const update = req.body;
        const calendarNote = yield (0, calendar_service_1.getCalendarNote)({
            _id: calendarNoteId,
        });
        if (!calendarNote) {
            return res.sendStatus(404);
        }
        if (String(calendarNote.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedCalendarNote = yield (0, calendar_service_1.getAndUpdateCalendarNote)({ _id: calendarNoteId }, update, {
            new: true,
        });
        return res.send(updatedCalendarNote);
    });
}
exports.updateCalendarNoteController = updateCalendarNoteController;
function getCalendarNoteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const calendarNoteId = req.params.calendarId;
        const calendarNote = yield (0, calendar_service_1.getCalendarNote)({
            _id: calendarNoteId,
        });
        if (!calendarNote) {
            return res.sendStatus(404);
        }
        if (String(calendarNote.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.send(calendarNote);
    });
}
exports.getCalendarNoteController = getCalendarNoteController;
function getCalendarNotesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const calendarNotes = yield (0, calendar_service_1.getCalendarNotes)({ user: userId });
        if (!calendarNotes) {
            return res.sendStatus(404);
        }
        return res.send(calendarNotes);
    });
}
exports.getCalendarNotesController = getCalendarNotesController;
function deleteCalendarNoteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const calendarNoteId = req.params.calendarId;
        const calendar = yield (0, calendar_service_1.getCalendarNote)({
            _id: calendarNoteId,
        });
        if (!calendar) {
            return res.sendStatus(404);
        }
        if (String(calendar.user) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, calendar_service_1.deleteCalendarNote)({ _id: calendarNoteId });
        return res.sendStatus(200);
    });
}
exports.deleteCalendarNoteController = deleteCalendarNoteController;
