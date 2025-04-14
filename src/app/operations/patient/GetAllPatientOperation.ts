import { inject, injectable } from 'tsyringe'
import { PatientAppService } from '../../services/PatientAppService'
import { IPatientDTO } from '../../dtos/IPatientDTO'
import { IPaginationProps } from '@/domain/repositories/IBaseRepository'

@injectable()
export class GetAllPatientOperation {
  constructor(
    @inject('PatientAppService')
    private readonly patientService: PatientAppService,
  ) {}

  async execute(
    page: number,
    limit: number,
  ): Promise<IPaginationProps<IPatientDTO>> {
    return await this.patientService.findAllPaginated(page, limit)
  }
}
