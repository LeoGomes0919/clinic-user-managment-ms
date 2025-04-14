import { inject, injectable } from 'tsyringe'
import { PatientAppService } from '../../services/PatientAppService'
import { IPatientDTO } from '../../dtos/IPatientDTO'

@injectable()
export class GetPatientOperation {
  constructor(
    @inject('PatientAppService')
    private readonly patientService: PatientAppService,
  ) {}

  async execute(id: string): Promise<IPatientDTO> {
    return await this.patientService.findById(id)
  }
}
