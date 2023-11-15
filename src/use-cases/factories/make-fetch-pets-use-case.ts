import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetUseCase } from '../fetch-pets'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeFetchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new FetchPetUseCase(petsRepository, orgsRepository)

  return useCase
}
