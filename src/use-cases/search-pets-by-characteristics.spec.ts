import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { SearchPetsByCharacteristicsUseCase } from './search-pets-by-characteristics'
import console from 'console'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetsByCharacteristicsUseCase

describe('Search Pets By Characteristics Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsByCharacteristicsUseCase(petsRepository, orgsRepository)

    await orgsRepository.create({
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

  it('should be able search pets by characteristics', async () => {
    await petsRepository.create({
      name: 'Alfredo',
      description: 'pet description',
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

    await petsRepository.create({
      name: 'Osvaldo',
      description: 'pet description',
      age: 'ELDERLY',
      energy: 'LOW',
      size: 'LARGE',
      environment: 'SPACIOUS',
      independece: 'MEDIUM',
      org_id: 'ong-01',
      requisites: [
        'Local grande para o animal correr e brincar',
        'Proibido apartamento',
      ],
      images: [],
    })

    const { pets } = await sut.execute({
      page: 1,
      city: 'Sacramento',
      state: 'MG',
      size: 'LARGE',
      independece: 'MEDIUM',
    })

    expect(pets).toHaveLength(1)
  })
})
