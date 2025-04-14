import { inject, injectable } from 'tsyringe'
import { Patient } from '../entities/Patient'
import { IPatientRepository } from '../repositories/IPatientRepository'
import { NotFoundException } from '../exceptions/NotFoundException'
import { EnumMessage } from '../enums/EnumMessage'
import { UserAlreadyExistsException } from '../exceptions/UserAlreadyExistsException'
import { IPaginationProps } from '../repositories/IBaseRepository'
import { parseISO } from 'date-fns'

interface IUpdateProps {
  name?: string
  email?: string
  phone?: string
  birthDate?: Date
}

@injectable()
export class PatientDomainService {
  constructor(
    @inject('IPatientRepository')
    private readonly patientRepository: IPatientRepository,
    @inject('EnumMessage') private readonly enumMessage: typeof EnumMessage,
  ) {}

  async register(patient: Patient): Promise<Patient> {
    const existingUser = await this.patientRepository.findByCpf(patient.cpf)

    if (existingUser) {
      throw new UserAlreadyExistsException(this.enumMessage.USER_ALREADY_EXISTS)
    }

    return await this.patientRepository.create(patient)
  }

  async update(id: string, patient: IUpdateProps): Promise<Patient> {
    const existingUser = await this.patientRepository.findById(id)

    if (!existingUser) {
      throw new NotFoundException(this.enumMessage.USER_NOT_FOUND)
    }

    if (patient.birthDate) {
      patient.birthDate = parseISO(
        patient.birthDate.toISOString().substring(0, 10),
      )
    }

    return await this.patientRepository.update(id, patient)
  }

  async getAllPaginated(
    page: number,
    limit: number,
  ): Promise<IPaginationProps<Patient>> {
    return await this.patientRepository.findAllPaginated(page, limit)
  }

  async getById(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findById(id)
    if (!patient) {
      throw new NotFoundException(this.enumMessage.USER_NOT_FOUND)
    }

    return patient
  }

  async delete(id: string): Promise<void> {
    const patient = await this.patientRepository.findById(id)
    if (!patient) {
      throw new NotFoundException(this.enumMessage.USER_NOT_FOUND)
    }

    await this.patientRepository.delete(id)
  }
}
