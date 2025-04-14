import { Credentials } from '../value-objects/Credentials'
import { UniqueEntityId } from '../value-objects/UniqueEntityId'
import { Person } from './Person'

export interface IPatientProps {}

export class Patient extends Person<IPatientProps> {
  static create({
    name,
    email,
    cpf,
    phone,
    birthDate,
    credentials,
    createdAt,
    updatedAt,
    deletedAt,
    id,
  }: {
    name: string
    email: string
    cpf: string
    phone: string
    birthDate: Date
    credentials: Credentials
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
    id?: UniqueEntityId
  }): Patient {
    const user = new Patient(
      name,
      email,
      cpf,
      phone,
      birthDate,
      credentials,
      createdAt,
      updatedAt,
      deletedAt,
      id,
    )

    return user
  }
}
