import { boolean, object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    // uid: string({
    //   required_error: 'uid is required',
    // }),
    // role: string({
    //   required_error: 'role is required',
    // }),
    // providerId: string({
    //   required_error: 'providerId is required',
    // }),
    // phoneNumber: string({
    //   required_error: 'phoneNumber is required',
    // }),
    name: string({
      required_error: 'Name is required',
    }),
    lastName: string({
      required_error: 'LastName is required',
    }),
    fullName: string({
      required_error: 'FullName is required',
    }),
    password: string({
      required_error: 'Name is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    photoURL: string().optional(),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    // emailVerified: boolean(),
  }),
});

export const editUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    lastName: string({
      required_error: 'LastName is required',
    }),
    fullName: string({
      required_error: 'FullName is required',
    }),
    photoURL: string().optional(),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type EditUserInput = TypeOf<typeof editUserSchema>;
