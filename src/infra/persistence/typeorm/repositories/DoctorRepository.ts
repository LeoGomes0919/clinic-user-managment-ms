import { DataSource } from 'typeorm'
import { BaseRepository } from './BaseRepository'
import { inject, injectable } from 'tsyringe'
import { Constructor } from './RepositoryTypes'
import { IPaginationProps } from '@/domain/repositories/IBaseRepository'
import { IDoctorRepository } from '@/domain/repositories/IDoctorRepository'
import { Doctor } from '@/domain/entities/Doctor'
import { DoctorModel } from '../models/DoctorModel'
import { DoctorMapper } from '../mappers/DoctorMapper'
import { NotFoundException } from '@/domain/exceptions/NotFoundException'

@injectable()
export class DoctorRepository
  extends BaseRepository<Doctor, DoctorModel>
  implements IDoctorRepository {
  constructor(@inject('DataSource') dataSource: DataSource) {
    super(DoctorModel as Constructor<DoctorModel>, dataSource)
  }

  protected toDomain(doctorModel: DoctorModel): Doctor {
    return DoctorMapper.toEntity(doctorModel)
  }

  protected toPersistence(doctor: Doctor): DoctorModel {
    return DoctorMapper.toDatabase(doctor) as DoctorModel
  }

  async findAllPaginated(
    page: number,
    limit: number,
  ): Promise<IPaginationProps<Doctor>> {
    const [result, total] = await this.ormRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    })

    const doctors = result.map((doctorModel) => this.toDomain(doctorModel))
    const pages = Math.ceil(total / limit)

    return {
      items: doctors,
      total,
      pages,
      current: page,
    }
  }

  async findAll(): Promise<Doctor[]> {
    const doctors = await this.ormRepository.find()
    return doctors.map((doctor) => this.toDomain(doctor))
  }

  async findByCpf(cpf: string): Promise<boolean> {
    const doctor = await this.ormRepository.findOneBy({ cpf })
    return !!doctor
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete({ id })
  }

  async update(id: string, entity: Partial<Doctor>): Promise<Doctor> {
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
      throw new NotFoundException('Doctor not found')
    }

    const doctor = await this.ormRepository.findOneBy({ id })
    return this.toDomain(doctor)
  }

  async changeSpecialty(id: string, specialty: string): Promise<Doctor> {
    const result = await this.ormRepository.update({ id: id }, { specialty })

    if (result.affected === 0) {
      throw new NotFoundException('Doctor not found')
    }

    const doctor = await this.ormRepository.findOneBy({ id })
    return this.toDomain(doctor)
  }
}
