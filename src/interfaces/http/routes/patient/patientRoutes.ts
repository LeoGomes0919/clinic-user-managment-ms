import { httpConstants } from '@/shared/utils/httpConstants'
import { patientSchema } from './patientSchema'
import { IRouterResponse } from '../../dtos/IRouterResponse'
import { PatientController } from '../../controllers/PatientController'
import { container } from 'tsyringe'

export const patientRoutes = (): IRouterResponse[] => {
  const patientController = container.resolve(PatientController)

  return [
    {
      method: 'get',
      path: '/patients',
      schema: {
        tags: ['patients'],
        description: 'List all patients',
        query: patientSchema.query,
      },
      handler: patientController.findAllPaginated,
      response: {
        [httpConstants.code.OK]: {
          description: 'Successful response',
          schema: patientSchema.response,
        },
      },
    },
    {
      method: 'post',
      path: '/patients',
      schema: {
        tags: ['patients'],
        description: 'Create a new user',
        body: patientSchema.body,
      },
      handler: patientController.create,
      response: {
        [httpConstants.code.CREATED]: {
          description: 'Successful response',
          schema: patientSchema.response,
        },
      },
    },
    {
      method: 'put',
      path: '/patients/:id',
      schema: {
        tags: ['patients'],
        description: 'Update a user',
        params: patientSchema.params,
        body: patientSchema.bodyUpdate,
      },
      handler: patientController.update,
      response: {
        [httpConstants.code.OK]: {
          description: 'Successful response',
          schema: patientSchema.response,
        },
      },
    },
    {
      method: 'get',
      path: '/patients/:id',
      schema: {
        tags: ['patients'],
        description: 'Get a user by ID',
        params: patientSchema.params,
      },
      handler: patientController.findById,
      response: {
        [httpConstants.code.OK]: {
          description: 'Successful response',
          schema: patientSchema.response,
        },
      },
    },
    {
      method: 'delete',
      path: '/patients/:id',
      schema: {
        tags: ['patients'],
        description: 'Delete a user by ID',
        params: patientSchema.params,
      },
      handler: patientController.delete,
      response: {
        [httpConstants.code.OK]: {
          description: 'Successful response',
          schema: patientSchema.response,
        },
      },
    },
  ]
}
