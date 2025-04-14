import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'
import { Credentials } from '../value-objects/Credentials'

export class Person<T> {
  private _id: UniqueEntityId
  private _name: string
  private _email: string
  private _cpf: string
  private _phone: string
  private _birthDate: Date
  private _credentials: Credentials
  private _createdAt?: Date
  private _updatedAt?: Date
  private _deletedAt?: Date | null
  protected props?: T

  constructor(
    name: string,
    email: string,
    cpf: string,
    phone: string,
    birthDate: Date,
    credentials: Credentials,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    id?: UniqueEntityId,
    props?: T,
  ) {
    this._id = id || new UniqueEntityId()
    this.props = props
    this._name = name
    this._email = email
    this._cpf = cpf
    this._phone = phone
    this._birthDate = birthDate
    this._credentials = credentials
    this._createdAt = createdAt || new Date()
    this._updatedAt = updatedAt || new Date()
    this._deletedAt = deletedAt || null
  }

  get id(): UniqueEntityId {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get email(): string {
    return this._email
  }

  get cpf(): string {
    return this._cpf
  }

  get phone(): string {
    return this._phone
  }

  get birthDate(): Date {
    return this._birthDate
  }

  get credentials(): Credentials {
    return this._credentials
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date {
    return this._updatedAt
  }

  get deletedAt(): Date {
    return this._deletedAt
  }

  public update(entity: Partial<Person<T>>): Person<T> {
    this._name = entity.name || this._name
    this._email = entity.email || this._email
    this._cpf = entity.cpf || this._cpf
    this._phone = entity.phone || this._phone
    this._birthDate = entity.birthDate || this._birthDate
    this._updatedAt = new Date()

    return this
  }

  public changePassword(newPassword: string): void {
    this.credentials.changePassword(newPassword)
  }
}
