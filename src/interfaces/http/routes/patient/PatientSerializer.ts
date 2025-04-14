import { IPatientDTO } from '@/app/dtos/IPatientDTO'
import { hateos } from '../../commons/hateos'
import { internalSerialize } from '../../commons/internalSerialize'

export class PatientSerializer {
  public serialize(patient: IPatientDTO): object {
    const { id, createdAt, updatedAt, deletedAt, ...others } = patient
    const links = hateos.default(id.toString(), 'patients')
    const internal = internalSerialize.serialize({
      createdAt,
      updatedAt,
      deletedAt,
    })

    return Object.assign({
      data: { ...others, ...internal },
      links,
    })
  }

  public serializeMany(patients: IPatientDTO[]): object {
    const data = patients.map((patient) => {
      const { id } = patient
      const links = hateos.default(id.toString(), 'patients')
      const internal = internalSerialize.serialize(patient)

      return Object.assign({ data: patient, links }, internal)
    })

    return { data }
  }
}
