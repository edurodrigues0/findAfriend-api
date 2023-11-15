import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { SearchPetsByCharacteristicsUseCase } from '../search-pets-by-characteristics'

export function makeSearchPetsByCharacteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new SearchPetsByCharacteristicsUseCase(
    petsRepository,
    orgsRepository,
  )

  return useCase
}
