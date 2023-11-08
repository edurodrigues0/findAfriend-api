import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetPetInfoUseCase } from './get-pet-info'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let ongRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetInfoUseCase

describe('Get Pet Use Case', () => {
  beforeEach(async () => {
    ongRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetInfoUseCase(petsRepository)

    await ongRepository.create({
      id: 'ong-01',
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      address: 'Rua Sao Miguel, 239A, Chafariz',
      city: 'Sacramento',
      state: 'MG',
      cep: '38190-000',
      whatsapp: '(34) 9 98424-9953',
    })
  })

  it('should be able get pet info', async () => {
    const createdPet = await petsRepository.create({
      name: 'Alfredo',
      description:
        'Eu sou um lindo doguinho de 3 anos, um jovem brincalhao que adora fazer companhia, uma arte mas tambem ama uma soneca.',
      age: 'PUPPY',
      energy: 'HIGH',
      size: 'SMALL',
      environment: 'INDOOR',
      independece: 'MEDIUM',
      org_id: 'ong-01',
      requisites: [
        'Local grande para o animal correr e brincar',
        'Proibido apartamento',
      ],
      images: [],
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.name).toEqual('Alfredo')
  })

  it('not should be able get pet info with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
