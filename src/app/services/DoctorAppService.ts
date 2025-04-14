import { inject, injectable } from 'tsyringe'
import { Credentials } from '@/domain/value-objects/Credentials'
import { IPaginationProps } from '@/domain/repositories/IBaseRepository'
import { EnumUserRole } from '@/domain/enums/EnumUserRole'
import { DoctorDomainService } from '@/domain/services/DoctorDomainService'
import { RegisterDoctorCommand } from '../commands/RegisterDoctorCommand'
import { IDoctorDTO } from '../dtos/IDoctorDTO'
import { Doctor } from '@/domain/entities/Doctor'
import { UpdateDoctorCommand } from '../commands/UpdateDoctorCommand'
import { parseISO } from 'date-fns'

@injectable()
export class DoctorAppService {
  constructor(
    @inject('DoctorDomainService')
    private readonly doctorDomainService: DoctorDomainService,
  ) {}

  async create(command: RegisterDoctorCommand): Promise<IDoctorDTO> {
    const { cpf, password } = command

    const role = EnumUserRole[EnumUserRole.DOCTOR]
    const credentials = Credentials.create(cpf, password, role)
    const doctor = Doctor.create({
      ...command,
      birthDate: parseISO(command.birthDate.toISOString().substring(0, 10)),
      credentials,
      props: { crm: command.crm, specialty: command.specialty },
    })

    const registered = await this.doctorDomainService.register(doctor)

    return this.toDTO(registered)
  }

  async update(command: UpdateDoctorCommand): Promise<IDoctorDTO> {
    const updated = await this.doctorDomainService.update(command.id, command)

    return this.toDTO(updated)
  }

  async findAllPaginated(
    page: number,
    limit: number,
  ): Promise<IPaginationProps<IDoctorDTO>> {
    const paginatedResult = await this.doctorDomainService.getAllPaginated(
      page,
      limit,
    )
    const parsedData = paginatedResult.items.map((doctor) => this.toDTO(doctor))

    return {
      ...paginatedResult,
      items: parsedData,
    }
  }

  async findById(id: string): Promise<IDoctorDTO> {
    const doctor = await this.doctorDomainService.getById(id)

    return this.toDTO(doctor)
  }

  async delete(id: string): Promise<void> {
    await this.doctorDomainService.delete(id)
  }

  async changeSpecialty(id: string, specialty: string): Promise<IDoctorDTO> {
    const result = await this.doctorDomainService.changeSpecialty(id, specialty)

    return this.toDTO(result)
  }

  private toDTO(doctor: Doctor): IDoctorDTO {
    return {
      id: doctor.id.toString(),
      name: doctor.name,
      email: doctor.email,
      cpf: doctor.cpf,
      phone: doctor.phone,
      role: doctor.credentials.role,
      crm: doctor.crm,
      specialty: doctor.specialty,
      birthDate: doctor.birthDate,
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
      deletedAt: doctor.deletedAt,
    }
  }
}
