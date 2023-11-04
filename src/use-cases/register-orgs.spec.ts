import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterOrgUseCase } from './register-orgs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
import { OrgsAlreadyExistsError } from './errors/orgs-already-exists'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Orgs Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be hash org password upon registration', async () => {
    const { org } = await sut.execute({
      responsibleName: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Rua Sao Miguel, 239A, Chafariz',
      cep: '38190-000',
      whatsapp: '(34) 9 98424-9953',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('not should be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      responsibleName: 'John Doe',
      email,
      password: '123456',
      address: 'Rua Sao Miguel, 239A, Chafariz',
      cep: '38190-000',
      whatsapp: '(34) 9 98424-9953',
    })

    await expect(() =>
      sut.execute({
        responsibleName: 'John Doe',
        email,
        password: '123456',
        address: 'Rua Sao Miguel, 239A, Chafariz',
        cep: '38190-000',
        whatsapp: '(34) 9 98424-9953',
      }),
    ).rejects.toBeInstanceOf(OrgsAlreadyExistsError)
  })

  it('should be able to register a org', async () => {
    const { org } = await sut.execute({
      responsibleName: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Rua Sao Miguel, 239A, Chafariz',
      cep: '38190-000',
      whatsapp: '(34) 9 98424-9953',
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.email).toEqual('johndoe@example.com')
  })
})
