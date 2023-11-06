import { PetsRepository } from '@/repositories/pets-repository'
import {
  Age,
  Energy,
  Environment,
  Independece,
  Pet,
  Size,
} from '@prisma/client'

interface RegisterPetsUseCaseRequest {
  name: string
  description: string
  age: Age
  size: Size
  energy: Energy
  independece: Independece
  environment: Environment
  images: string[]
  requisites: string[]
  orgId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    energy,
    environment,
    images,
    independece,
    orgId,
    requisites,
    size,
  }: RegisterPetsUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      energy,
      environment,
      images,
      independece,
      org_id: orgId,
      requisites,
      size,
    })

    return {
      pet,
    }
  }
}
