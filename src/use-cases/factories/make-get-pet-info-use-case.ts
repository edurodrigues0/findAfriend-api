import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { GetPetInfoUseCase } from '../get-pet-info'

export function makeGetPetInfoUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new GetPetInfoUseCase(petsRepository, orgsRepository)

  return useCase
}
