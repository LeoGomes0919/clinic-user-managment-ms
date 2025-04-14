import { Exception } from '@/domain/exceptions/Exception'
import { FastifyReply, FastifyRequest } from 'fastify'
import { sendErrorResponse } from '../helpers/send-error-response'
import { IRegisterPatientDTO } from '@/app/dtos/IRegisterPatientDTO'
import { RegisterPatientOperation } from '@/app/operations/patient/RegisterPatientOperation'
import { RegisterPatientCommand } from '@/app/commands/RegisterPatientCommand'
import { container } from 'tsyringe'
import { GetAllPatientOperation } from '@/app/operations/patient/GetAllPatientOperation'
import { GetPatientOperation } from '@/app/operations/patient/GetPatientOperation'
import { PatientSerializer } from '../routes/patient/PatientSerializer'
import { DeletePatientOperation } from '@/app/operations/patient/DeletePatientOperation'
import { httpConstants } from '@/shared/utils/httpConstants'
import { IUpdatePatientDTO } from '@/app/dtos/IUpdatePatientDTO'
import { UpdatePatientCommand } from '@/app/commands/UpdatePatientCommand'
import { UpdatePatientOperation } from '@/app/operations/patient/UpdatePatientOperation'

export class PatientController {
  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const data = request.body as IRegisterPatientDTO
      const registerCommand = new RegisterPatientCommand(data)
      const registerPatientOperation = container.resolve(
        RegisterPatientOperation,
      )
      const patientMapper = container.resolve(PatientSerializer)

      const patient = await registerPatientOperation.execute(registerCommand)
      const serializedPatient = patientMapper.serialize(patient)

      return reply.status(httpConstants.code.CREATED).send(serializedPatient)
    } catch (error) {
      if (error instanceof Exception) {
        return sendErrorResponse(reply, +error.error_code, error.message)
      }

      return sendErrorResponse(reply, 500, error.message)
    }
  }

  async findAllPaginated(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      const getAllUserOperation = container.resolve(GetAllPatientOperation)
      const { page, limit } = request.query as { page: number; limit: number }

      const data = await getAllUserOperation.execute(page, limit)

      return reply.status(httpConstants.code.OK).send(data)
    } catch (error) {
      if (error instanceof Exception) {
        return sendErrorResponse(reply, +error.error_code, error.message)
      }

      return sendErrorResponse(reply, 500, error.message)
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string }
      const data = request.body as IUpdatePatientDTO

      const updateCommand = new UpdatePatientCommand({ id, ...data })
      const updatePatientOperation = container.resolve(UpdatePatientOperation)
      const patientMapper = container.resolve(PatientSerializer)

      const patient = await updatePatientOperation.execute(updateCommand)
      const serializedPatient = patientMapper.serialize(patient)

      return reply.status(httpConstants.code.OK).send(serializedPatient)
    } catch (error) {
      if (error instanceof Exception) {
        return sendErrorResponse(reply, +error.error_code, error.message)
      }

      return sendErrorResponse(reply, 500, error.message)
    }
  }

  async findById(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string }
      const getPatientOperation = container.resolve(GetPatientOperation)
      const patientMapper = container.resolve(PatientSerializer)

      const patient = await getPatientOperation.execute(id)
      const serializedPatient = patientMapper.serialize(patient)

      return reply.status(httpConstants.code.OK).send(serializedPatient)
    } catch (error) {
      if (error instanceof Exception) {
        return sendErrorResponse(reply, +error.error_code, error.message)
      }

      return sendErrorResponse(reply, 500, error.message)
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string }
      const deletePatientOperation = container.resolve(DeletePatientOperation)

      await deletePatientOperation.execute(id)

      return reply
        .status(httpConstants.code.OK)
        .send({ message: httpConstants.message.OK })
    } catch (error) {
      if (error instanceof Exception) {
        return sendErrorResponse(reply, +error.error_code, error.message)
      }

      return sendErrorResponse(reply, 500, error.message)
    }
  }
}
