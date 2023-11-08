import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      org_id: data.org_id,
      age: data.age,
      energy: data.energy,
      size: data.size,
      independece: data.independece,
      environment: data.environment,
      requisites: [],
      images: [],
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findByOrg(orgId: string, page: number) {
    const pets = this.items
      .filter((item) => item.org_id === orgId)
      .slice((page - 1) * 20, page * 20)

    return pets
  }
}
