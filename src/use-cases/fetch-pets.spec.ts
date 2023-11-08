import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FetchPetUseCase } from './fetch-pets'
import { hash } from 'bcryptjs'

let ongRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(async () => {
    ongRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetUseCase(petsRepository, ongRepository)

    await ongRepository.create({
      id: 'ong-01',
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      address: 'Rua Sao Miguel, 239A, Chafariz',
      city: 'Sacramento',
      state: 'MG',
      cep: '38190-000',
      whatsapp: '(34) 9 98424-9953',
    })

    await ongRepository.create({
      id: 'ong-02',
      responsible_name: 'Eduardo Rodrigues',
      email: 'eduardorodrigues@example.com',
      password_hash: await hash('123456', 6),
      address: 'Rua Sao Miguel, 239A, Chafariz',
      city: 'Uberaba',
      state: 'MG',
      cep: '38190-000',
      whatsapp: '(34) 9 98424-9953',
    })
  })

  it('should be fetch pets by city', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `Pet ${i}`,
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
    }

    for (let i = 1; i <= 5; i++) {
      await petsRepository.create({
        name: `Pet ${i}`,
        description:
          'Eu sou um lindo doguinho de 3 anos, um jovem brincalhao que adora fazer companhia, uma arte mas tambem ama uma soneca.',
        age: 'PUPPY',
        energy: 'HIGH',
        size: 'SMALL',
        environment: 'INDOOR',
        independece: 'MEDIUM',
        org_id: 'ong-02',
        requisites: [
          'Local grande para o animal correr e brincar',
          'Proibido apartamento',
        ],
        images: [],
      })
    }

    const { pets } = await sut.execute({
      city: 'Sacramento',
      state: 'MG',
      page: 2,
    })

    expect(pets).toHaveLength(2)
  })
})
