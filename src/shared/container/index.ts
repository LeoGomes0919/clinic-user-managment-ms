import { container } from 'tsyringe'

import { IPatientRepository } from '@/domain/repositories/IPatientRepository'
import { PatientRepository } from '@/infra/persistence/typeorm/repositories/PatientRepository'
import { EnumMessage } from '@/domain/enums/EnumMessage'
import { PatientDomainService } from '@/domain/services/PatientDomainService'
import { AppDataSource } from '@/infra/config/dataSource'
import { PatientAppService } from '@/app/services/PatientAppService'
import { PatientController } from '@/interfaces/http/controllers/PatientController'
import { PatientSerializer } from '@/interfaces/http/routes/patient/PatientSerializer'
import { IDoctorRepository } from '@/domain/repositories/IDoctorRepository'
import { DoctorRepository } from '@/infra/persistence/typeorm/repositories/DoctorRepository'
import { DoctorDomainService } from '@/domain/services/DoctorDomainService'
import { DoctorAppService } from '@/app/services/DoctorAppService'
import { DoctorController } from '@/interfaces/http/controllers/DoctorController'
import { DoctorSerializer } from '@/interfaces/http/routes/doctor/DoctorSerializer'

container.registerSingleton<IPatientRepository>(
  'IPatientRepository',
  PatientRepository,
)
container.registerSingleton<IDoctorRepository>(
  'IDoctorRepository',
  DoctorRepository,
)
container.registerSingleton<DoctorDomainService>(
  'DoctorDomainService',
  DoctorDomainService,
)
container.registerSingleton<PatientDomainService>(
  'PatientDomainService',
  PatientDomainService,
)
container.registerSingleton<DoctorAppService>(
  'DoctorAppService',
  DoctorAppService,
)
container.registerSingleton<PatientAppService>(
  'PatientAppService',
  PatientAppService,
)

container.registerSingleton(PatientController)
container.registerSingleton(DoctorController)
container.registerSingleton(PatientSerializer)
container.registerSingleton(DoctorSerializer)
container.registerInstance('EnumMessage', EnumMessage)
container.register('DataSource', { useValue: AppDataSource })
