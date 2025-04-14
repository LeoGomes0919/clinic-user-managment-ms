import { inject, injectable } from 'tsyringe'
import { DoctorAppService } from '@/app/services/DoctorAppService'
import { IDoctorDTO } from '@/app/dtos/IDoctorDTO'

@injectable()
export class GetDoctorOperation {
  constructor(
    @inject('DoctorAppService')
    private readonly doctorAppService: DoctorAppService,
  ) {}

  async execute(id: string): Promise<IDoctorDTO> {
    return await this.doctorAppService.findById(id)
  }
}
