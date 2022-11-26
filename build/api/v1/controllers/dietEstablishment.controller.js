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
exports.deleteDietEstablishmentController = exports.getDietEstablishmentsController = exports.getDietEstablishmentQueryController = exports.getDietEstablishmentController = exports.updateDietEstablishmentController = exports.createDietEstablishmentController = void 0;
const dietEstablishments_model_1 = __importDefault(require("../models/dietEstablishments.model"));
const client_service_1 = require("../services/client.service");
const dietEstablishment_service_1 = require("../services/dietEstablishment.service");
const dietKind_service_1 = require("../services/dietKind/dietKind.service");
const measurement_service_1 = require("../services/measurement.service");
function createDietEstablishmentController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const dietEstablishment = yield (0, dietEstablishment_service_1.createDietEstablishment)(Object.assign(Object.assign({}, body), { user: userId }));
        return res.send(dietEstablishment);
    });
}
exports.createDietEstablishmentController = createDietEstablishmentController;
function updateDietEstablishmentController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietEstablishmentId = req.params.dietEstablishmentId;
        const update = req.body;
        const dietEstablishment = yield (0, dietEstablishment_service_1.getDietEstablishment)({
            _id: dietEstablishmentId,
        });
        if (!dietEstablishment) {
            return res.sendStatus(404);
        }
        if (String(dietEstablishment.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedDietEstablishment = yield (0, dietEstablishment_service_1.getAndUpdateDietEstablishment)({ _id: dietEstablishmentId }, update, {
            new: true,
        });
        return res.send(updatedDietEstablishment);
    });
}
exports.updateDietEstablishmentController = updateDietEstablishmentController;
function getDietEstablishmentController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietEstablishmentId = req.params.dietEstablishmentId;
        const dietEstablishment = yield (0, dietEstablishment_service_1.getDietEstablishment)({
            _id: dietEstablishmentId,
        });
        if (!dietEstablishment) {
            return res.sendStatus(404);
        }
        if (String(dietEstablishment.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.send(dietEstablishment);
    });
}
exports.getDietEstablishmentController = getDietEstablishmentController;
function getDietEstablishmentQueryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietEstablishmentId = req.params.dietEstablishmentId;
        const dietEstablishment = yield (0, dietEstablishment_service_1.getDietEstablishment)({
            _id: dietEstablishmentId,
        });
        if (!dietEstablishment) {
            return res.sendStatus(404);
        }
        if (String(dietEstablishment.user) !== userId) {
            return res.sendStatus(403);
        }
        const dietEstablishmentClient = yield (0, client_service_1.getClient)({
            _id: dietEstablishment.client,
        });
        const dietEstablishmentMeasurement = yield (0, measurement_service_1.getMeasurement)({
            _id: dietEstablishment.measurementId,
        });
        const dietEstablishmentDietKind = yield (0, dietKind_service_1.getDietKind)({
            _id: dietEstablishment.dietKind,
        });
        const dietEstablishmentQueryObj = Object.assign(Object.assign({}, dietEstablishment), { patientObj: dietEstablishmentClient, measurementObj: dietEstablishmentMeasurement, dietKindObj: dietEstablishmentDietKind });
        return res.send(dietEstablishmentQueryObj);
    });
}
exports.getDietEstablishmentQueryController = getDietEstablishmentQueryController;
// export async function getDietEstablishmentsController(
//   req: Request,
//   res: Response
// ) {
//   const userId = res.locals.user._id;
//   const dietEstablishments = await getDietEstablishments({ user: userId });
//   if (!dietEstablishments) {
//     return res.sendStatus(404);
//   }
//   const dietEstablishmentQuery = await Promise.all(
//     dietEstablishments.map(async (dietEstablishment) => {
//       const client = await getClient({ _id: dietEstablishment.client });
//       return {
//         ...dietEstablishment,
//         patient: {
//           fullName: client?.name + ' ' + client?.lastName,
//         },
//       };
//     })
//   );
//   return res.send(dietEstablishmentQuery);
// }
function getDietEstablishmentsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const queryPage = req.query.page;
        const itemsCount = req.query.itemsCount;
        if (queryPage && itemsCount) {
            const page = parseInt(queryPage);
            const skip = (page - 1) * parseInt(itemsCount); // 1 * 20 = 20
            const countPromise = dietEstablishments_model_1.default.estimatedDocumentCount();
            const dietEstablishmentsPromise = dietEstablishments_model_1.default.find({
                user: userId,
            })
                .limit(parseInt(itemsCount))
                .skip(skip);
            const [count, dietEstablishments] = yield Promise.all([
                countPromise,
                dietEstablishmentsPromise,
            ]);
            const dietEstablishmentsQuery = yield Promise.all(dietEstablishments.map((dietEstablishmentDocument) => __awaiter(this, void 0, void 0, function* () {
                const dietEstablishment = dietEstablishmentDocument.toObject();
                const client = yield (0, client_service_1.getClient)({ _id: dietEstablishment.client });
                return Object.assign(Object.assign({}, dietEstablishment), { patient: {
                        fullName: (client === null || client === void 0 ? void 0 : client.name) + ' ' + (client === null || client === void 0 ? void 0 : client.lastName),
                    } });
            })));
            const pageCount = count / parseInt(itemsCount); // 400 items / 20 = 20
            if (!count || !dietEstablishmentsQuery) {
                return res.sendStatus(404);
            }
            return res.send({
                pagination: {
                    count,
                    pageCount,
                },
                dietEstablishments: dietEstablishmentsQuery,
            });
        }
        const dietEstablishments = yield (0, dietEstablishment_service_1.getDietEstablishments)({ user: userId });
        if (!dietEstablishments) {
            return res.sendStatus(404);
        }
        const dietEstablishmentQuery = yield Promise.all(dietEstablishments.map((dietEstablishmentDocument) => __awaiter(this, void 0, void 0, function* () {
            const dietEstablishment = dietEstablishmentDocument.toObject();
            const client = yield (0, client_service_1.getClient)({ _id: dietEstablishment.client });
            return Object.assign(Object.assign({}, dietEstablishment), { patient: {
                    fullName: (client === null || client === void 0 ? void 0 : client.name) + ' ' + (client === null || client === void 0 ? void 0 : client.lastName),
                } });
        })));
        if (!dietEstablishmentQuery) {
            return res.sendStatus(404);
        }
        return res.send(dietEstablishmentQuery);
    });
}
exports.getDietEstablishmentsController = getDietEstablishmentsController;
function deleteDietEstablishmentController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietEstablishmentId = req.params.dietEstablishmentId;
        const dietEstablishment = yield (0, dietEstablishment_service_1.getDietEstablishment)({
            _id: dietEstablishmentId,
        });
        if (!dietEstablishment) {
            return res.sendStatus(404);
        }
        if (String(dietEstablishment.user) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, dietEstablishment_service_1.deleteDietEstablishment)({ _id: dietEstablishmentId });
        return res.sendStatus(200);
    });
}
exports.deleteDietEstablishmentController = deleteDietEstablishmentController;
