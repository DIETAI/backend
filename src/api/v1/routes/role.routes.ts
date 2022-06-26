// import express from 'express';

// // //controllers
// import {
//   createRolesController,
//   updateRoleController,
//   deleteRoleController,
//   getRoleController,
//   getRolesController,
// } from '../controllers/role.controller';

// //schema
// import {
//   createRoleSchema,
//   deleteRoleSchema,
//   getRoleSchema,
//   updateRoleSchema,
// } from '../schema/role.schema';

// //middleware
// import { userAuthenticated } from '../middleware/user.middleware';
// import validateSchema from '../middleware/schema.middleware';
// import { roleCheck } from '../middleware/role.middleware';

// const router = express.Router();

// // router.get('/', getProductsController);

// router.get(
//   '/:roleId',
//   [userAuthenticated, roleCheck(['admin']), validateSchema(getRoleSchema)],
//   getRoleController
// );

// router.get('/', [userAuthenticated, roleCheck(['admin'])], getRolesController);

// router.post(
//   '/',
//   [userAuthenticated, validateSchema(createRoleSchema)],
//   createRolesController
// );

// router.put(
//   '/:roleId',
//   [userAuthenticated, validateSchema(updateRoleSchema)],
//   updateRoleController
// );

// router.delete(
//   '/:roleId',
//   [userAuthenticated, validateSchema(deleteRoleSchema)],
//   deleteRoleController
// );

// export default router;
