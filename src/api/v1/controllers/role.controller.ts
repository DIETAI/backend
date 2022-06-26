import { Request, Response } from 'express';
import {
  CreateRoleInput,
  UpdateRoleInput,
  DeleteRoleInput,
  GetRoleInput,
} from '../schema/role.schema';
import {
  createRole,
  deleteRole,
  getAndUpdateRole,
  getRole,
  getRoles,
} from '../services/role.service';

export async function createRolesController(
  req: Request<{}, {}, CreateRoleInput['body']>,
  res: Response
) {
  const body = req.body;

  const role = await createRole({ ...body });

  return res.send(role);
}

export async function updateRoleController(
  req: Request<UpdateRoleInput['params']>,
  res: Response
) {
  const roleId = req.params.roleId;
  const update = req.body;

  const role = await getRole({ _id: roleId });

  if (!role) {
    return res.sendStatus(404);
  }

  const updatedRole = await getAndUpdateRole({ _id: roleId }, update, {
    new: true,
  });

  return res.send(updatedRole);
}

export async function getRoleController(
  req: Request<GetRoleInput['params']>,
  res: Response
) {
  const roleId = req.params.roleId;

  const role = await getRole({ _id: roleId });

  if (!role) {
    return res.sendStatus(404);
  }

  return res.send(role);
}

export async function getRolesController(req: Request, res: Response) {
  const roles = await getRoles();

  if (!roles) {
    return res.sendStatus(404);
  }

  return res.send(roles);
}

export async function deleteRoleController(
  req: Request<DeleteRoleInput['params']>,
  res: Response
) {
  const roleId = req.params.roleId;

  const role = await getRole({ _id: roleId });

  if (!role) {
    return res.sendStatus(404);
  }

  await deleteRole({ _id: roleId });

  return res.sendStatus(200);
}
