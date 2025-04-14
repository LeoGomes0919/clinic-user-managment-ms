import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'
import { Credentials } from '@/domain/value-objects/Credentials'
import { DoctorModel } from '../models/DoctorModel'
import { Doctor } from '@/domain/entities/Doctor'

export class DoctorMapper {
  public static toEntity(patientModel: DoctorModel): Doctor {
    return new Doctor(
      patientModel.name,
      patientModel.email,
      patientModel.cpf,
      patientModel.phone,
      patientModel.birthDate,
      new Credentials(
        patientModel.cpf,
        patientModel.password,
        patientModel.role,
      ),
      patientModel.createdAt,
      patientModel.updatedAt,
      patientModel.deletedAt,
      patientModel.id ? new UniqueEntityId(patientModel.id) : null,
      { crm: patientModel.crm, specialty: patientModel.specialty },
    )
  }

  public static toDatabase(patient: Doctor): DoctorModel {
    return {
      id: patient.id?.toString(),
      name: patient.name,
      email: patient.email,
      cpf: patient.cpf,
      phone: patient.phone,
      birthDate: patient.birthDate,
      crm: patient.crm,
      specialty: patient.specialty,
      password: patient.credentials.password,
      role: patient.credentials.role,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
      deletedAt: patient.deletedAt,
    }
  }
}
