import { inject, injectable } from 'tsyringe'
import { IRegisterPatientDTO } from '../../dtos/IRegisterPatientDTO'
import { PatientAppService } from '../../services/PatientAppService'
import { IPatientDTO } from '../../dtos/IPatientDTO'
import { RegisterPatientCommand } from '../../commands/RegisterPatientCommand'

@injectable()
export class RegisterPatientOperation {
  constructor(
    @inject('PatientAppService')
    private readonly patientService: PatientAppService,
  ) {}

  async execute(data: IRegisterPatientDTO): Promise<IPatientDTO> {
    const command = new RegisterPatientCommand({ ...data })

    return await this.patientService.create(command)
  }
}
