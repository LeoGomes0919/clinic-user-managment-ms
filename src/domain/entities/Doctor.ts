import { Credentials } from '../value-objects/Credentials'
import { UniqueEntityId } from '../value-objects/UniqueEntityId'
import { Person } from './Person'

export interface IDoctorProps {
  specialty: string
  crm: string
}

export class Doctor extends Person<IDoctorProps> {
  get specialty(): string {
    return this.props.specialty
  }

  get crm(): string {
    return this.props.crm
  }

  static create({
    name,
    email,
    cpf,
    phone,
    birthDate,
    credentials,
    props,
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
    props: IDoctorProps
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
    id?: UniqueEntityId
  }): Doctor {
    const user = new Doctor(
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
      props,
    )

    return user
  }

  public addSpecialty(specialty: string): void {
    this.props.specialty = specialty
  }

  public removeSpecialty(): void {
    this.props.specialty = ''
  }
}
