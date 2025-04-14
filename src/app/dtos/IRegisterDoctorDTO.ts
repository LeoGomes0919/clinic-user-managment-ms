import { IBaseRegisterDTO } from './IBaseRegisterDTO'

export interface IRegisterDoctorDTO extends IBaseRegisterDTO {
  crm: string
  specialty: string
}
