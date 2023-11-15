import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../register-pets'

export function makeRegisterPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new RegisterPetUseCase(petsRepository)

  return useCase
}
