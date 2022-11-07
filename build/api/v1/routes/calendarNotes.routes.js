"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const calendar_controller_1 = require("../controllers/calendar/calendar.controller");
//schema
const calendar_schema_1 = require("../schema/calendar/calendar.schema");
//middleware
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/:calendarId', [requireUser_1.default, (0, schema_middleware_1.default)(calendar_schema_1.getCalendarSchema)], calendar_controller_1.getCalendarNoteController);
router.get('/', requireUser_1.default, calendar_controller_1.getCalendarNotesController);
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(calendar_schema_1.createCalendarSchema)], calendar_controller_1.createCalendarNoteController);
router.put('/:calendarId', [requireUser_1.default, (0, schema_middleware_1.default)(calendar_schema_1.updateCalendarSchema)], calendar_controller_1.updateCalendarNoteController);
router.delete('/:calendarId', [requireUser_1.default, (0, schema_middleware_1.default)(calendar_schema_1.deleteCalendarSchema)], calendar_controller_1.deleteCalendarNoteController);
exports.default = router;
