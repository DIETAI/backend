import { object, number, string, TypeOf, z, array, date, isValid } from 'zod';

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    // client: string({
    //   required_error: 'Client is required',
    // }),
    date: z.string().transform((date) => new Date(date)),
    notes: string().optional(),
    images: array(string()).optional(),
    age: number({
      required_error: 'Weight is required',
    }).positive(),
    sex: z.enum(['male', 'female']),
    weight: number({
      required_error: 'Weight is required',
    }).positive(),
    height: number({
      required_error: 'Height is required',
    }).positive(),
    pal: number({
      required_error: 'Pal is required',
    })
      .min(1.3, 'Pal too short - should 1.3')
      .max(2.2, 'Pal too big - max 2.2'),
    bmi: number({
      required_error: 'Bmi is required',
    }).min(16, 'Height too short - should 16 minimum'),
    // bmi_type: z.enum(['niedowaga', 'norma', 'nadwaga', 'otyłość']),
    ppmMifflin: number({
      required_error: 'Ppm mifflin is required',
    }).positive(),
    ppmHarris: number({
      required_error: 'Ppm harris is required',
    }).positive(),
    cpm: number({
      required_error: 'Cpm is required',
    }).positive(),
    whr: number().optional(),
    whtr: number().optional(),
    ymca: number().optional(),
    chest_breath: number().optional(),
    chest_exhaust: number().optional(),
    shoulder: number().optional(),
    shoulder_tonus: number().optional(),
    waist: number().optional(),
    hip: number().optional(),
    forearm: number().optional(),
    thigh: number().optional(),
    calf: number().optional(),
    biceps: number().optional(),
    triceps: number().optional(),
    shoulder_blade: number().optional(),
    ala_of_ilium: number().optional(),
    iliac_spine: number().optional(),
  }),
};

const params = {
  params: object({
    measurementId: string({
      required_error: 'measurementId is required',
    }),
  }),
};

export const createMeasurementSchema = object({
  ...payload,
});

export const updateMeasurementSchema = object({
  ...payload,
  ...params,
});

export const deleteMeasurementSchema = object({
  ...params,
});

export const getMeasurementSchema = object({
  ...params,
});

export type CreateMeasurementInput = TypeOf<typeof createMeasurementSchema>;
export type UpdateMeasurementInput = TypeOf<typeof updateMeasurementSchema>;
export type GetMeasurementInput = TypeOf<typeof getMeasurementSchema>;
export type DeleteMeasurementInput = TypeOf<typeof deleteMeasurementSchema>;
