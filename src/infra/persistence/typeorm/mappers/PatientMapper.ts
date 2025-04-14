import { Patient } from '@/domain/entities/Patient'
import { PatientModel } from '../models/PatientModel'
import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'
import { Credentials } from '@/domain/value-objects/Credentials'

export class PatientMapper {
  public static toEntity(patientModel: PatientModel): Patient {
    return new Patient(
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
    )
  }

  public static toDatabase(patient: Patient): PatientModel {
    return {
      id: patient.id?.toString(),
      name: patient.name,
      email: patient.email,
      cpf: patient.cpf,
      phone: patient.phone,
      birthDate: patient.birthDate,
      password: patient.credentials.password,
      role: patient.credentials.role,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
      deletedAt: patient.deletedAt,
    }
  }
}
