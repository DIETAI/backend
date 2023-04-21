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
exports.deleteClientController = exports.getClientsController = exports.getClientController = exports.updateClientController = exports.createClientController = void 0;
const client_model_1 = __importDefault(require("../models/client.model"));
const client_service_1 = require("../services/client.service");
function createClientController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const client = yield (0, client_service_1.createClient)(Object.assign(Object.assign({}, body), { user: userId }));
        return res.send(client);
    });
}
exports.createClientController = createClientController;
function updateClientController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const clientId = req.params.clientId;
        const update = req.body;
        const client = yield (0, client_service_1.getClient)({ _id: clientId });
        if (!client) {
            return res.sendStatus(404);
        }
        if (String(client.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedClient = yield (0, client_service_1.getAndUpdateClient)({ _id: clientId }, update, {
            new: true,
        });
        return res.send(updatedClient);
    });
}
exports.updateClientController = updateClientController;
function getClientController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const clientId = req.params.clientId;
        const client = yield (0, client_service_1.getClient)({ _id: clientId });
        if (!client) {
            return res.sendStatus(404);
        }
        if (String(client.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.send(client);
    });
}
exports.getClientController = getClientController;
function getClientsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const queryPage = req.query.page;
        const itemsCount = req.query.itemsCount;
        if (queryPage && itemsCount) {
            const page = parseInt(queryPage);
            const skip = (page - 1) * parseInt(itemsCount); // 1 * 20 = 20
            console.log({ skip });
            const countPromise = client_model_1.default.estimatedDocumentCount();
            const clientsPromise = client_model_1.default.find({ user: userId })
                .limit(parseInt(itemsCount))
                .skip(skip);
            const [count, clients] = yield Promise.all([countPromise, clientsPromise]);
            const pageCount = count / parseInt(itemsCount); // 400 items / 20 = 20
            if (!count || !clients) {
                return res.sendStatus(404);
            }
            return res.send({
                pagination: {
                    count,
                    pageCount,
                },
                clients,
            });
        }
        const clients = yield (0, client_service_1.getClients)({ user: userId });
        if (!clients) {
            return res.sendStatus(404);
        }
        return res.send(clients);
    });
}
exports.getClientsController = getClientsController;
function deleteClientController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const clientId = req.params.clientId;
        const client = yield (0, client_service_1.getClient)({ _id: clientId });
        if (!client) {
            return res.sendStatus(404);
        }
        if (String(client.user) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, client_service_1.deleteClient)({ _id: clientId });
        return res.sendStatus(200);
    });
}
exports.deleteClientController = deleteClientController;
