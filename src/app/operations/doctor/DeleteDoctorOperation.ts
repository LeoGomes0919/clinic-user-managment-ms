import { DoctorAppService } from '@/app/services/DoctorAppService'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteDoctorOperation {
  constructor(
    @inject('DoctorAppService')
    private readonly doctorAppService: DoctorAppService,
  ) {}

  async execute(id: string): Promise<void> {
    await this.doctorAppService.delete(id)
  }
}
