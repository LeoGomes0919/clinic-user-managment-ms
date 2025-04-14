import { inject, injectable } from 'tsyringe'
import { PatientAppService } from '../../services/PatientAppService'

@injectable()
export class DeletePatientOperation {
  constructor(
    @inject('PatientAppService')
    private readonly patientService: PatientAppService,
  ) {}

  async execute(id: string): Promise<void> {
    await this.patientService.delete(id)
  }
}
