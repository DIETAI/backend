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
exports.deleteRoleController = exports.getRolesController = exports.getRoleController = exports.updateRoleController = exports.createRolesController = void 0;
const role_service_1 = require("../services/role.service");
function createRolesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const role = yield (0, role_service_1.createRole)(Object.assign({}, body));
        return res.send(role);
    });
}
exports.createRolesController = createRolesController;
function updateRoleController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const roleId = req.params.roleId;
        const update = req.body;
        const role = yield (0, role_service_1.getRole)({ _id: roleId });
        if (!role) {
            return res.sendStatus(404);
        }
        const updatedRole = yield (0, role_service_1.getAndUpdateRole)({ _id: roleId }, update, {
            new: true,
        });
        return res.send(updatedRole);
    });
}
exports.updateRoleController = updateRoleController;
function getRoleController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const roleId = req.params.roleId;
        const role = yield (0, role_service_1.getRole)({ _id: roleId });
        if (!role) {
            return res.sendStatus(404);
        }
        return res.send(role);
    });
}
exports.getRoleController = getRoleController;
function getRolesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const roles = yield (0, role_service_1.getRoles)();
        if (!roles) {
            return res.sendStatus(404);
        }
        return res.send(roles);
    });
}
exports.getRolesController = getRolesController;
function deleteRoleController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const roleId = req.params.roleId;
        const role = yield (0, role_service_1.getRole)({ _id: roleId });
        if (!role) {
            return res.sendStatus(404);
        }
        yield (0, role_service_1.deleteRole)({ _id: roleId });
        return res.sendStatus(200);
    });
}
exports.deleteRoleController = deleteRoleController;
