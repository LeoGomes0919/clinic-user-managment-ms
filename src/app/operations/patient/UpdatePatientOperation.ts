import { inject, injectable } from 'tsyringe'
import { PatientAppService } from '../../services/PatientAppService'
import { IPatientDTO } from '../../dtos/IPatientDTO'
import { IUpdatePatientDTO } from '../../dtos/IUpdatePatientDTO'
import { UpdatePatientCommand } from '../../commands/UpdatePatientCommand'

@injectable()
export class UpdatePatientOperation {
  constructor(
    @inject('PatientAppService')
    private readonly patientService: PatientAppService,
  ) {}

  async execute(data: IUpdatePatientDTO): Promise<IPatientDTO> {
    const command = new UpdatePatientCommand({ ...data })

    return await this.patientService.update(command)
  }
}
