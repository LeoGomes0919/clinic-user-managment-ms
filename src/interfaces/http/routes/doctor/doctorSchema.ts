import z from 'zod'
import { IBaseRegisterSchema } from './../../dtos/IBaseRegisterSchema'

export const doctorSchema = {
  ...IBaseRegisterSchema,
  params: z.object({
    id: z.string().uuid(),
  }),
  query: z.object({
    page: z.coerce.number().default(1).optional(),
    limit: z.coerce.number().default(10).optional(),
  }),
  body: IBaseRegisterSchema.body.extend({
    crm: z
      .string()
      .nonempty('CRM is required')
      .min(5, 'CRM must have at least 5 characters'),
    specialty: z
      .string()
      .nonempty('Specialty is required')
      .min(3, 'Specialty must have at least 3 characters'),
  }),
  bodyUpdate: z.object({
    name: z
      .string()
      .nonempty('Name is required')
      .min(3, 'Name must have at least 3 characters')
      .optional(),
    email: z
      .string()
      .nonempty('Email is required')
      .email('Invalid email')
      .optional(),
    phone: z
      .string()
      .nonempty('Phone is required')
      .min(11, 'Phone must have 11 characters')
      .optional(),
    birthDate: z.coerce
      .date({
        required_error: 'Birth date is required',
        invalid_type_error: 'Invalid birth date',
      })
      .optional(),
  }),
  patch: z.object({
    specialty: z
      .string()
      .nonempty('Specialty is required')
      .min(3, 'Specialty must have at least 3 characters'),
  }),
}
