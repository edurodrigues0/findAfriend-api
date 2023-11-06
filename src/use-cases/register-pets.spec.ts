import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './register-pets'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Orgs Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able register a pet with a ONG', async () => {
    const { pet } = await sut.execute({
      name: 'Alfredo',
      description:
        'Eu sou um lindo doguinho de 3 anos, um jovem brincalhao que adora fazer companhia, uma arte mas tambem ama uma soneca.',
      age: 'PUPPY',
      energy: 'HIGH',
      size: 'SMALL',
      environment: 'INDOOR',
      independece: 'MEDIUM',
      orgId: 'ong-1',
      requisites: [
        'Local grande para o animal correr e brincar',
        'Proibido apartamento',
      ],
      images: [],
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Alfredo')
  })
})
