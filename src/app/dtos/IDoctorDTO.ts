import { IBaseDTO } from './IBaseDTO'

export interface IDoctorDTO extends IBaseDTO {
  crm: string
  specialty: string
}
