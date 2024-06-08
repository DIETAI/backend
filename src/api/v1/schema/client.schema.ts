import { object, number, string, TypeOf, z, array, boolean } from 'zod';

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    lastName: string({
      required_error: 'Last name is required',
    }),
    dateOfBirth: z.string().transform((date) => new Date(date)),
    gender: z.enum(['male', 'female']),
    physiologicalState: z.enum(['lack', 'pregnancy', 'lactation']),
    email: string().optional(),
    image: string().optional(),
    phoneNumber: string().optional(),
    onlineAccount: boolean().optional(),
    street: string().optional(),
    zipCode: string().optional(),
    city: string().optional(),
    notes: string().optional(),
    diseases: array(
      z.enum([
        'flatulence',
        'constipation',
        'reflux',
        'obesity',
        'osteoporosis',
        'gout',
        'atherosclerosis',
        'hypertension',
        'tumor',
      ])
    ).optional(),
    alergens: array(z.enum(['peanuts', 'rye', 'eggProtein'])).optional(),

    expectedBodyWeight: number().positive().optional(),
    specificAims: array(string()).optional(),
    likedProducts: array(string()).optional(),
    dislikedProducts: array(string()).optional(),
    pal: number({
      required_error: 'Pal is required',
    })
      .min(1.3, 'Pal too short - should 1.3')
      .max(2.2, 'Pal too big - max 2.2'),
  }),
};

const params = {
  params: object({
    clientId: string({
      required_error: 'clientId is required',
    }),
  }),
};

const query = {
  query: object({
    page: string().optional(),
    itemsCount: string().optional(),
  }),
};

export const createClientSchema = object({
  ...payload,
});

export const updateClientSchema = object({
  ...payload,
  ...params,
});

export const deleteClientSchema = object({
  ...params,
});

export const getClientSchema = object({
  ...params,
});

export const getClientsSchema = object({
  ...query,
});

export type CreateClientInput = TypeOf<typeof createClientSchema>;
export type UpdateClientInput = TypeOf<typeof updateClientSchema>;
export type GetClientInput = TypeOf<typeof getClientSchema>;
export type GetClientsInput = TypeOf<typeof getClientsSchema>;
export type DeleteClientInput = TypeOf<typeof deleteClientSchema>;
