import { ZodObject, ZodRawShape, ZodType } from 'zod'

export interface IBaseRouterSchema {
  headers?: ZodObject<ZodRawShape> | ZodType<null>
  query?: ZodObject<ZodRawShape> | ZodType<null>
  params?: ZodObject<ZodRawShape> | ZodType<null>
  body?: ZodObject<ZodRawShape> | ZodType<null>
  response: Record<number, ZodObject<ZodRawShape>>
}
