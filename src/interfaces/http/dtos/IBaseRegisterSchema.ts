import z from 'zod'
import { IBaseRouterSchema } from './IBaseRouterSchema'

type IRegisterSchema = IBaseRouterSchema

export const IBaseRegisterSchema: IRegisterSchema = {
  body: z.object({
    name: z
      .string()
      .nonempty('Name is required')
      .min(3, 'Name must have at least 3 characters'),
    email: z.string().nonempty('Email is required').email('Invalid email'),
    password: z.string().min(6, 'Password must have at least 6 characters'),
    cpf: z
      .string()
      .nonempty('CPF is required')
      .min(11, 'CPF must have 11 characters'),
    phone: z
      .string()
      .nonempty('Phone is required')
      .min(11, 'Phone must have 11 characters'),
    birthDate: z.coerce.date({
      required_error: 'Birth date is required',
      invalid_type_error: 'Invalid birth date',
    }),
  }),
  response: {
    200: z.object({}),
    400: z.object({}),
    409: z.object({}),
    422: z.object({}),
    500: z.object({}),
  },
}
