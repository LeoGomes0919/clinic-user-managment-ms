import { IBaseRegisterDTO } from '../dtos/IBaseRegisterDTO'
import { EnumUserRole } from './../../domain/enums/EnumUserRole'

export class BaseRegisterCommand {
  public readonly name: string
  public readonly email: string
  public readonly cpf: string
  public readonly phone: string
  public readonly birthDate: Date
  public readonly password: string

  constructor(input: IBaseRegisterDTO) {
    this.name = input.name
    this.email = input.email
    this.cpf = input.cpf
    this.phone = input.phone
    this.birthDate = input.birthDate
    this.password = input.password
  }
}
