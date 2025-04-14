import { Doctor } from '../entities/Doctor'
import { IBaseRepository } from './IBaseRepository'

export interface IDoctorRepository extends IBaseRepository<Doctor> {
  changeSpecialty(id: string, specialtyId: string): Promise<Doctor>
}
