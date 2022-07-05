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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const response_time_1 = __importDefault(require("response-time"));
const dbConnect_1 = __importDefault(require("./api/v1/utils/dbConnect"));
const logger_1 = __importDefault(require("./api/v1/utils/logger"));
const routes_1 = __importDefault(require("./api/v1/routes/routes"));
const deserializeUser_1 = __importDefault(require("./api/v1/middleware/deserializeUser"));
const metrics_1 = require("./api/v1/utils/metrics");
const port = process.env.PORT || 1337;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN || 'http://localhost:3000',
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(deserializeUser_1.default);
app.use((0, response_time_1.default)((req, res, time) => {
    var _a;
    if ((_a = req === null || req === void 0 ? void 0 : req.route) === null || _a === void 0 ? void 0 : _a.path) {
        metrics_1.restResponseTimeHistogram.observe({
            method: req.method,
            route: req.route.path,
            status_code: res.statusCode,
        }, time * 1000);
    }
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`App is running at http://localhost:${port}`);
    yield (0, dbConnect_1.default)();
    (0, routes_1.default)(app);
    (0, metrics_1.startMetricsServer)();
}));
