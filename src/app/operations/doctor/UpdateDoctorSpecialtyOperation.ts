import { inject, injectable } from 'tsyringe'
import { DoctorAppService } from '@/app/services/DoctorAppService'
import { IDoctorDTO } from '@/app/dtos/IDoctorDTO'

@injectable()
export class UpdateDoctorSpecialtyOperation {
  constructor(
    @inject('DoctorAppService')
    private readonly doctorAppService: DoctorAppService,
  ) {}

  async execute(id: string, specialty: string): Promise<IDoctorDTO> {
    return await this.doctorAppService.changeSpecialty(id, specialty)
  }
}
