import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface GetPetInfoUseCaseRequest {
  petId: string
}

interface GetPetInfoUseCaseResponse {
  pet: Pet
  whatsapp: string
}

export class GetPetInfoUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    petId,
  }: GetPetInfoUseCaseRequest): Promise<GetPetInfoUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const whatsapp = await this.orgsRepository.findWhatsappById(pet.org_id)

    if (!whatsapp) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
      whatsapp,
    }
  }
}
