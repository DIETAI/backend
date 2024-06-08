"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleCheck = void 0;
const roleCheck = (roles) => {
    return (req, res, next) => {
        console.log('Role check');
        next();
    };
};
exports.roleCheck = roleCheck;
