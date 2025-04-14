import { inject, injectable } from 'tsyringe'
import { IPaginationProps } from '@/domain/repositories/IBaseRepository'
import { DoctorAppService } from '@/app/services/DoctorAppService'
import { IDoctorDTO } from '@/app/dtos/IDoctorDTO'

@injectable()
export class GetAllDoctorOperation {
  constructor(
    @inject('DoctorAppService')
    private readonly doctorAppService: DoctorAppService,
  ) {}

  async execute(
    page: number,
    limit: number,
  ): Promise<IPaginationProps<IDoctorDTO>> {
    return await this.doctorAppService.findAllPaginated(page, limit)
  }
}
