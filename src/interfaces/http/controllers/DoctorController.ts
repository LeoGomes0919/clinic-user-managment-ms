import { Exception } from '@/domain/exceptions/Exception'
import { FastifyReply, FastifyRequest } from 'fastify'
import { sendErrorResponse } from '../helpers/send-error-response'
import { container } from 'tsyringe'
import { httpConstants } from '@/shared/utils/httpConstants'
import { IRegisterDoctorDTO } from '@/app/dtos/IRegisterDoctorDTO'
import { RegisterDoctorCommand } from '@/app/commands/RegisterDoctorCommand'
import { RegisterDoctorOperation } from '@/app/operations/doctor/RegisterDoctorOperation'
import { DoctorSerializer } from '../routes/doctor/DoctorSerializer'
import { GetAllDoctorOperation } from '@/app/operations/doctor/GetAllDoctorOperation'
import { UpdateDoctorCommand } from '@/app/commands/UpdateDoctorCommand'
import { IUpdateDoctorDTO } from '@/app/dtos/IUpdateDoctorDTO'
import { UpdateDoctorOperation } from '@/app/operations/doctor/UpdateDoctorOperation'
import { DeleteDoctorOperation } from '@/app/operations/doctor/DeleteDoctorOperation'
import { UpdateDoctorSpecialtyOperation } from '@/app/operations/doctor/UpdateDoctorSpecialtyOperation'
import { GetDoctorOperation } from '@/app/operations/doctor/GetDoctorOperation'

export class DoctorController {
  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const data = request.body as IRegisterDoctorDTO
      const registerCommand = new RegisterDoctorCommand(data)
      const registerDoctorOperation = container.resolve(RegisterDoctorOperation)
      const doctorMapper = container.resolve(DoctorSerializer)

      const doctor = await registerDoctorOperation.execute(registerCommand)
      const serializedDoctor = doctorMapper.serialize(doctor)

      return reply.status(httpConstants.code.CREATED).send(serializedDoctor)
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
      const getAllDoctorOperation = container.resolve(GetAllDoctorOperation)
      const { page, limit } = request.query as { page: number; limit: number }

      const data = await getAllDoctorOperation.execute(page, limit)

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
      const data = request.body as IUpdateDoctorDTO

      const updateCommand = new UpdateDoctorCommand({ id, ...data })
      const updateDoctorOperation = container.resolve(UpdateDoctorOperation)
      const doctorMapper = container.resolve(DoctorSerializer)

      const doctor = await updateDoctorOperation.execute(updateCommand)
      const serializedDoctor = doctorMapper.serialize(doctor)

      return reply.status(httpConstants.code.OK).send(serializedDoctor)
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
      const getDoctorOperation = container.resolve(GetDoctorOperation)
      const doctorMapper = container.resolve(DoctorSerializer)

      const doctor = await getDoctorOperation.execute(id)
      const serializedDoctor = doctorMapper.serialize(doctor)

      return reply.status(httpConstants.code.OK).send(serializedDoctor)
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
      const deleteDoctorOperation = container.resolve(DeleteDoctorOperation)

      await deleteDoctorOperation.execute(id)

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

  async changeSpecialty(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      const { id } = request.params as { id: string }
      const data = request.body as { specialty: string }

      const updateDoctorSpecialtyOperation = container.resolve(
        UpdateDoctorSpecialtyOperation,
      )
      const doctorMapper = container.resolve(DoctorSerializer)

      const doctor = await updateDoctorSpecialtyOperation.execute(
        id,
        data.specialty,
      )
      const serializedDoctor = doctorMapper.serialize(doctor)

      return reply.status(httpConstants.code.OK).send(serializedDoctor)
    } catch (error) {
      if (error instanceof Exception) {
        return sendErrorResponse(reply, +error.error_code, error.message)
      }

      return sendErrorResponse(reply, 500, error.message)
    }
  }
}
