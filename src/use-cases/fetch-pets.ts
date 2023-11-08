import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchPetsUseCaseRequest {
  city: string
  state: string
  page: number
}

interface FetchPetsUseCaseResponse {
  pets: Pet[] | null
}

export class FetchPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    city,
    state,
    page,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const ongs = await this.orgsRepository.findPetsByCity(city, state)

    if (!ongs) {
      throw new ResourceNotFoundError()
    }

    const pets = (
      await Promise.all(
        ongs.map(async (ong) => {
          return this.petsRepository.findByOrg(ong.id, page)
        }),
      )
    ).flat()

    return {
      pets,
    }
  }
}
