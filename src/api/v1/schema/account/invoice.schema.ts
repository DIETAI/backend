import { object, number, string, TypeOf, z, array, date } from 'zod';

const payload = {
  body: object({
    companyName: string({
      required_error: 'Company name is required',
    }),
    taxpayerIdentificationNumber: string({
      required_error: 'Taxpayer identification number is required',
    }), //nip
    zipCode: string({
      required_error: 'ZIP code is required',
    }),
    city: string({
      required_error: 'City is required',
    }),
    street: string({
      required_error: 'Street is required',
    }),
    houseNumber: string({
      required_error: 'House number is required',
    }),
    apartmentNumber: string().optional(),
  }),
};

const params = {
  params: object({
    invoiceId: string({
      required_error: 'invoiceId is required',
    }),
  }),
};

export const createInvoiceSchema = object({
  ...payload,
});

export const updateInvoiceSchema = object({
  ...payload,
  ...params,
});

export const deleteInvoiceSchema = object({
  ...params,
});

export type CreateInvoiceInput = TypeOf<typeof createInvoiceSchema>;
export type UpdateInvoiceInput = TypeOf<typeof updateInvoiceSchema>;
export type DeleteInvoiceInput = TypeOf<typeof deleteInvoiceSchema>;
