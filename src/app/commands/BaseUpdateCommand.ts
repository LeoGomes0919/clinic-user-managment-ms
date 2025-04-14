import { IBaseUpdateDTO } from '../dtos/IBaseUpdateDTO'

export class BaseUpdateCommand {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly phone: string
  public readonly birthDate: Date

  constructor(input: IBaseUpdateDTO) {
    this.id = input.id
    this.name = input.name
    this.email = input.email
    this.phone = input.phone
    this.birthDate = input.birthDate
  }
}
