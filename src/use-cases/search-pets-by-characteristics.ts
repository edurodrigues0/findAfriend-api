import { PetsRepository } from '@/repositories/pets-repository'
import {
  Pet,
  Energy,
  Environment,
  Age,
  Independece,
  Size,
} from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface FilterPetsByCharacteristics {
  age?: Age
  energy?: Energy
  size?: Size
  independece?: Independece
  environment?: Environment
}

interface SearchPetsByCharacteristicsUseCaseRequest {
  city: string
  state: string
  page: number
  energy?: Energy
  environment?: Environment
  age?: Age
  independece?: Independece
  size?: Size
}

interface SearchPetsByCharacteristicsUseCaseResponse {
  pets: Pet[] | null
}

export class SearchPetsByCharacteristicsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    page,
    age,
    city,
    energy,
    environment,
    independece,
    size,
    state,
  }: SearchPetsByCharacteristicsUseCaseRequest): Promise<SearchPetsByCharacteristicsUseCaseResponse> {
    const params: FilterPetsByCharacteristics = {
      age,
      energy,
      environment,
      independece,
      size,
    }
    const ongs = await this.orgsRepository.findPetsByCity(city, state)

    const petsNearby = (
      await Promise.all(
        ongs?.map(async (ong) => {
          return this.petsRepository.fetchByOrg(ong.id, page)
        }) ?? [],
      )
    ).flat()

    const pets = petsNearby
      .filter((item) => {
        for (const key in params) {
          if (
            params[key as keyof FilterPetsByCharacteristics] !== undefined &&
            item[key as keyof Pet] !==
              params[key as keyof FilterPetsByCharacteristics]
          ) {
            return false
          }
        }
        return true
      })
      .slice((page - 1) * 20, page * 20)

    return {
      pets,
    }
  }
}
