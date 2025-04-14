import { inject, injectable } from 'tsyringe'
import { UpdatePatientCommand } from '../../commands/UpdatePatientCommand'
import { DoctorAppService } from '@/app/services/DoctorAppService'
import { IUpdateDoctorDTO } from '@/app/dtos/IUpdateDoctorDTO'
import { IDoctorDTO } from '@/app/dtos/IDoctorDTO'

@injectable()
export class UpdateDoctorOperation {
  constructor(
    @inject('DoctorAppService')
    private readonly doctorAppService: DoctorAppService,
  ) {}

  async execute(data: IUpdateDoctorDTO): Promise<IDoctorDTO> {
    const command = new UpdatePatientCommand({ ...data })

    return await this.doctorAppService.update(command)
  }
}
