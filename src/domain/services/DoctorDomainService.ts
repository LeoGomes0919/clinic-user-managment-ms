import { inject, injectable } from 'tsyringe'
import { NotFoundException } from '../exceptions/NotFoundException'
import { EnumMessage } from '../enums/EnumMessage'
import { UserAlreadyExistsException } from '../exceptions/UserAlreadyExistsException'
import { IPaginationProps } from '../repositories/IBaseRepository'
import { parseISO } from 'date-fns'
import { IDoctorRepository } from '../repositories/IDoctorRepository'
import { Doctor } from '../entities/Doctor'
import { EnumUserRole } from '../enums/EnumUserRole'
import { Credentials } from '../value-objects/Credentials'

interface IUpdateProps {
  name?: string
  email?: string
  phone?: string
  birthDate?: Date
}

@injectable()
export class DoctorDomainService {
  constructor(
    @inject('IDoctorRepository')
    private readonly doctorRepository: IDoctorRepository,
    @inject('EnumMessage') private readonly enumMessage: typeof EnumMessage,
  ) {}

  async register(doctor: Doctor): Promise<Doctor> {
    const existingUser = await this.doctorRepository.findByCpf(doctor.cpf)

    if (existingUser) {
      throw new UserAlreadyExistsException(this.enumMessage.USER_ALREADY_EXISTS)
    }

    return await this.doctorRepository.create(doctor)
  }

  async update(id: string, doctor: IUpdateProps): Promise<Doctor> {
    const existingUser = await this.doctorRepository.findById(id)

    if (!existingUser) {
      throw new NotFoundException(this.enumMessage.USER_NOT_FOUND)
    }

    if (doctor.birthDate) {
      doctor.birthDate = parseISO(
        doctor.birthDate.toISOString().substring(0, 10),
      )
    }

    return await this.doctorRepository.update(id, doctor)
  }

  async getAllPaginated(
    page: number,
    limit: number,
  ): Promise<IPaginationProps<Doctor>> {
    return await this.doctorRepository.findAllPaginated(page, limit)
  }

  async getById(id: string): Promise<Doctor> {
    const doctor = await this.doctorRepository.findById(id)
    if (!doctor) {
      throw new NotFoundException(this.enumMessage.USER_NOT_FOUND)
    }

    return doctor
  }

  async delete(id: string): Promise<void> {
    const doctor = await this.doctorRepository.findById(id)
    if (!doctor) {
      throw new NotFoundException(this.enumMessage.USER_NOT_FOUND)
    }

    await this.doctorRepository.delete(id)
  }

  async changeSpecialty(id: string, specialty: string): Promise<Doctor> {
    return await this.doctorRepository.changeSpecialty(id, specialty)
  }
}
