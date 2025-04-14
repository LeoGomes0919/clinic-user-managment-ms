import { EnumUserRole } from '@/domain/enums/EnumUserRole'

export interface IBaseDTO {
  id: string
  name: string
  email: string
  cpf: string
  phone: string
  role: string
  birthDate: Date
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
