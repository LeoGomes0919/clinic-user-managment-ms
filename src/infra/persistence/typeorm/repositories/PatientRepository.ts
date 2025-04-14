import { Patient } from '@/domain/entities/Patient'
import { IPatientRepository } from '@/domain/repositories/IPatientRepository'
import { DataSource } from 'typeorm'
import { PatientModel } from '../models/PatientModel'
import { PatientMapper } from '../mappers/PatientMapper'
import { BaseRepository } from './BaseRepository'
import { inject, injectable } from 'tsyringe'
import { Constructor } from './RepositoryTypes'
import { IPaginationProps } from '@/domain/repositories/IBaseRepository'

@injectable()
export class PatientRepository
  extends BaseRepository<Patient, PatientModel>
  implements IPatientRepository {
  constructor(@inject('DataSource') dataSource: DataSource) {
    super(PatientModel as Constructor<PatientModel>, dataSource)
  }

  protected toDomain(patientModel: PatientModel): Patient {
    return PatientMapper.toEntity(patientModel)
  }

  protected toPersistence(patient: Patient): PatientModel {
    return PatientMapper.toDatabase(patient) as PatientModel
  }

  async findAllPaginated(
    page: number,
    limit: number,
  ): Promise<IPaginationProps<Patient>> {
    const [result, total] = await this.ormRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    })

    const patients = result.map((patientModel) => this.toDomain(patientModel))
    const pages = Math.ceil(total / limit)

    return {
      items: patients,
      total,
      pages,
      current: page,
    }
  }

  async findAll(): Promise<Patient[]> {
    const patientModels = await this.ormRepository.find()
    return patientModels.map((patient) => this.toDomain(patient))
  }

  async findByCpf(cpf: string): Promise<boolean> {
    const patient = await this.ormRepository.findOneBy({ cpf })
    return !!patient
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete({ id })
  }

  async update(id: string, entity: Partial<Patient>): Promise<Patient> {
    const result = await this.ormRepository.update(
      { id: id },
      {
        name: entity.name,
        email: entity.email,
        phone: entity.phone,
        birthDate: entity.birthDate,
      },
    )

    if (result.affected === 0) {
      throw new Error('Patient not found')
    }

    const patient = await this.ormRepository.findOneBy({ id })
    return this.toDomain(patient)
  }
}
