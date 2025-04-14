import { Patient } from '../entities/Patient'
import { IBaseRepository } from './IBaseRepository'

export interface IPatientRepository extends IBaseRepository<Patient> {}
