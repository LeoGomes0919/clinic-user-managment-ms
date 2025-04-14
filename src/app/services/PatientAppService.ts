import { PatientDomainService } from '@/domain/services/PatientDomainService'
import { inject, injectable } from 'tsyringe'
import { IPatientDTO } from '../dtos/IPatientDTO'
import { RegisterPatientCommand } from '../commands/RegisterPatientCommand'
import { Patient } from '@/domain/entities/Patient'
import { Credentials } from '@/domain/value-objects/Credentials'
import { IPaginationProps } from '@/domain/repositories/IBaseRepository'
import { EnumUserRole } from '@/domain/enums/EnumUserRole'
import { UpdatePatientCommand } from '../commands/UpdatePatientCommand'
import { parseISO } from 'date-fns'

@injectable()
export class PatientAppService {
  constructor(
    @inject('PatientDomainService')
    private readonly patientDomainService: PatientDomainService,
  ) {}

  async create(command: RegisterPatientCommand): Promise<IPatientDTO> {
    const { cpf, password } = command

    const role = EnumUserRole[EnumUserRole.PATIENT]
    const credentials = Credentials.create(cpf, password, role)
    const patient = Patient.create({
      ...command,
      birthDate: parseISO(command.birthDate.toISOString().substring(0, 10)),
      credentials,
    })

    const registered = await this.patientDomainService.register(patient)

    return this.toDTO(registered)
  }

  async update(command: UpdatePatientCommand): Promise<IPatientDTO> {
    const updated = await this.patientDomainService.update(command.id, command)

    return this.toDTO(updated)
  }

  async findAllPaginated(
    page: number,
    limit: number,
  ): Promise<IPaginationProps<IPatientDTO>> {
    const paginatedResult = await this.patientDomainService.getAllPaginated(
      page,
      limit,
    )
    const parsedData = paginatedResult.items.map((patient) =>
      this.toDTO(patient),
    )

    return {
      ...paginatedResult,
      items: parsedData,
    }
  }

  async getProfile(id: string): Promise<IPatientDTO> {
    const patient = await this.patientDomainService.getById(id)

    return this.toDTO(patient)
  }

  async findById(id: string): Promise<IPatientDTO> {
    const patient = await this.patientDomainService.getById(id)

    return this.toDTO(patient)
  }

  async delete(id: string): Promise<void> {
    await this.patientDomainService.delete(id)
  }

  private toDTO(patient: Patient): IPatientDTO {
    return {
      id: patient.id.toString(),
      name: patient.name,
      email: patient.email,
      cpf: patient.cpf,
      phone: patient.phone,
      role: patient.credentials.role,
      birthDate: patient.birthDate,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
      deletedAt: patient.deletedAt,
    }
  }
}
