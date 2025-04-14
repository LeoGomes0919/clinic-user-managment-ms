import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { EnumUserRole } from '@/domain/enums/EnumUserRole'
import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'

@Entity('doctors')
export class DoctorModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ type: 'varchar', nullable: false, length: 100 })
  name: string

  @Column({ type: 'varchar', nullable: false, length: 100 })
  email: string

  @Column({ type: 'varchar', nullable: false, length: 20 })
  phone: string

  @Column({ type: 'char', nullable: false, length: 11 })
  cpf: string

  @Column({ name: 'birth_date', type: 'date', nullable: false })
  birthDate: Date

  @Column({ type: 'varchar', nullable: false })
  password: string

  @Column({ type: 'varchar', nullable: false, length: 20 })
  crm: string

  @Column({ type: 'enum', enum: EnumUserRole, nullable: false })
  role: keyof typeof EnumUserRole

  @Column({ type: 'varchar', nullable: false, length: 100 })
  specialty: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null

  constructor() {
    if (!this.id) {
      this.id = new UniqueEntityId().toString()
    }
  }
}
