import { container } from 'tsyringe'
import { httpConstants } from '@/shared/utils/httpConstants'
import { IRouterResponse } from '../../dtos/IRouterResponse'
import { DoctorController } from '../../controllers/DoctorController'
import { doctorSchema } from './doctorSchema'

export const doctorRoutes = (): IRouterResponse[] => {
  const doctorController = container.resolve(DoctorController)

  return [
    {
      method: 'get',
      path: '/doctors',
      schema: {
        tags: ['doctors'],
        description: 'List all doctors',
        query: doctorSchema.query,
      },
      handler: doctorController.findAllPaginated,
      response: {
        [httpConstants.code.OK]: {
          description: 'Successful response',
          schema: doctorSchema.response,
        },
      },
    },
    {
      method: 'post',
      path: '/doctors',
      schema: {
        tags: ['doctors'],
        description: 'Create a new user',
        body: doctorSchema.body,
      },
      handler: doctorController.create,
      response: {
        [httpConstants.code.CREATED]: {
          description: 'Successful response',
          schema: doctorSchema.response,
        },
      },
    },
    {
      method: 'put',
      path: '/doctors/:id',
      schema: {
        tags: ['doctors'],
        description: 'Update a user',
        params: doctorSchema.params,
        body: doctorSchema.bodyUpdate,
      },
      handler: doctorController.update,
      response: {
        [httpConstants.code.OK]: {
          description: 'Successful response',
          schema: doctorSchema.response,
        },
      },
    },
    {
      method: 'get',
      path: '/doctors/:id',
      schema: {
        tags: ['doctors'],
        description: 'Get a user by ID',
        params: doctorSchema.params,
      },
      handler: doctorController.findById,
      response: {
        [httpConstants.code.OK]: {
          description: 'Successful response',
          schema: doctorSchema.response,
        },
      },
    },
    {
      method: 'delete',
      path: '/doctors/:id',
      schema: {
        tags: ['doctors'],
        description: 'Delete a user by ID',
        params: doctorSchema.params,
      },
      handler: doctorController.delete,
      response: {
        [httpConstants.code.OK]: {
          description: 'Successful response',
          schema: doctorSchema.response,
        },
      },
    },
    {
      method: 'patch',
      path: '/doctors/:id',
      schema: {
        tags: ['doctors'],
        description: 'Patch a user by ID',
        params: doctorSchema.params,
        body: doctorSchema.patch,
      },
      handler: doctorController.changeSpecialty,
      response: {
        [httpConstants.code.OK]: {
          description: 'Successful response',
          schema: doctorSchema.response,
        },
      },
    },
  ]
}
