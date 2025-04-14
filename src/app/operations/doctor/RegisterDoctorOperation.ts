import { inject, injectable } from 'tsyringe'
import { DoctorAppService } from '@/app/services/DoctorAppService'
import { IDoctorDTO } from '@/app/dtos/IDoctorDTO'
import { IRegisterDoctorDTO } from '@/app/dtos/IRegisterDoctorDTO'
import { RegisterDoctorCommand } from '@/app/commands/RegisterDoctorCommand'

@injectable()
export class RegisterDoctorOperation {
  constructor(
    @inject('DoctorAppService')
    private readonly doctorAppService: DoctorAppService,
  ) {}

  async execute(data: IRegisterDoctorDTO): Promise<IDoctorDTO> {
    const command = new RegisterDoctorCommand({ ...data })

    return await this.doctorAppService.create(command)
  }
}
