import { IRegisterDoctorDTO } from '../dtos/IRegisterDoctorDTO'
import { BaseRegisterCommand } from './BaseRegisterCommand'

export class RegisterDoctorCommand extends BaseRegisterCommand {
  public readonly crm: string
  public readonly specialty: string

  constructor(input: IRegisterDoctorDTO) {
    super(input)
    this.crm = input.crm
    this.specialty = input.specialty
  }
}
