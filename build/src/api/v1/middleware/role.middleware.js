"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleCheck = void 0;
const roleCheck = (roles) => {
    return (req, res, next) => {
        // const userId = req.userId;
        // const user = await getUser({ uid: userId });
        // console.log(user);
        console.log('Role check');
        // //find user
        // //find role
        // roles.includes('admin');
        next();
    };
};
exports.roleCheck = roleCheck;
