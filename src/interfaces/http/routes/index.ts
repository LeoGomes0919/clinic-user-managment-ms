import { FastifyTypedInstance } from '@/shared/utils/types'
import { routerRegister } from './routerRegister'
import { patientRoutes } from './patient/patientRoutes'
import { doctorRoutes } from './doctor/doctorRoutes'

export async function routes(app: FastifyTypedInstance): Promise<void> {
  const routes = [...patientRoutes(), ...doctorRoutes()]

  const register = routerRegister(app)
  await register(routes)
}
