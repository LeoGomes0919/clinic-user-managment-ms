import bcrypt from 'bcrypt'
import { EnumUserRole } from '../enums/EnumUserRole'

export class Credentials {
  private _username: string
  private _password: string
  private _role: keyof typeof EnumUserRole

  constructor(
    username: string,
    password: string,
    role: keyof typeof EnumUserRole,
  ) {
    this._username = username
    this._password = this.hashPassword(password)
    this._role = role
  }

  get username(): string {
    return this._username
  }

  get password(): string {
    return this._password
  }

  get role(): keyof typeof EnumUserRole {
    return this._role
  }

  static create(
    username: string,
    password: string,
    role: keyof typeof EnumUserRole,
  ): Credentials {
    return new Credentials(username, password, role)
  }

  public changePassword(newPassword: string): void {
    this._password = this.hashPassword(newPassword)
  }

  private hashPassword(password: string): string {
    const passwordHash = bcrypt.hashSync(password, 12)
    return passwordHash
  }

  toJson(): any {
    return {
      username: this._username,
      password: this._password,
      role: this._role,
    }
  }

  toJsonString(): string {
    return JSON.stringify(this.toJson())
  }
}
