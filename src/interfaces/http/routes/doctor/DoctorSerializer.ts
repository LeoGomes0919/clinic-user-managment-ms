import { hateos } from '../../commons/hateos'
import { internalSerialize } from '../../commons/internalSerialize'
import { IDoctorDTO } from '@/app/dtos/IDoctorDTO'

export class DoctorSerializer {
  public serialize(doctor: IDoctorDTO): object {
    const { id, createdAt, updatedAt, deletedAt, ...others } = doctor
    const links = hateos.default(id.toString(), 'doctors')
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

  public serializeMany(doctors: IDoctorDTO[]): object {
    const data = doctors.map((patient) => {
      const { id } = patient
      const links = hateos.default(id.toString(), 'doctors')
      const internal = internalSerialize.serialize(patient)

      return Object.assign({ data: patient, links }, internal)
    })

    return { data }
  }
}
