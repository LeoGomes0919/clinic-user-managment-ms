import { Enum } from '@/shared/utils/enum'

export const EnumMessage = Enum({
  USER_NOT_FOUND: 'User not found.',
  USER_ALREADY_EXISTS: 'User already exists.',
  INVALID_CREDENTIALS: 'Invalid credentials.',
  INVALID_TOKEN: 'Invalid token.',
  UNAUTHORIZED: 'Unauthorized.',
  INTERNAL_SERVER_ERROR: 'Internal server error.',
})
