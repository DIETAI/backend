import { object, number, string, TypeOf, z, literal } from 'zod';

const payload = {
  body: object({
    type: z.enum(['personal', 'patient', 'dietician', 'admin']),
  }),
};

const params = {
  params: object({
    roleId: string({
      required_error: 'roleId is required',
    }),
  }),
};

export const createRoleSchema = object({
  ...payload,
});

export const updateRoleSchema = object({
  ...payload,
  ...params,
});

export const deleteRoleSchema = object({
  ...params,
});

export const getRoleSchema = object({
  ...params,
});

export type CreateRoleInput = TypeOf<typeof createRoleSchema>;
export type UpdateRoleInput = TypeOf<typeof updateRoleSchema>;
export type GetRoleInput = TypeOf<typeof getRoleSchema>;
export type DeleteRoleInput = TypeOf<typeof deleteRoleSchema>;
