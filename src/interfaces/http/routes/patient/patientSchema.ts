import z from 'zod'
import { IBaseRegisterSchema } from './../../dtos/IBaseRegisterSchema'

export const patientSchema = {
  ...IBaseRegisterSchema,
  params: z.object({
    id: z.string().uuid(),
  }),
  query: z.object({
    page: z.coerce.number().default(1).optional(),
    limit: z.coerce.number().default(10).optional(),
  }),
  bodyUpdate: z.object({
    name: z
      .string()
      .nonempty('Name is required')
      .min(3, 'Name must have at least 3 characters'),
    email: z.string().nonempty('Email is required').email('Invalid email'),
    phone: z
      .string()
      .nonempty('Phone is required')
      .min(11, 'Phone must have 11 characters'),
    birthDate: z.coerce.date({
      required_error: 'Birth date is required',
      invalid_type_error: 'Invalid birth date',
    }),
  }),
}
