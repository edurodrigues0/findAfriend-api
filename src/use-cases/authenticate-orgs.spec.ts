import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateOrgsUseCase } from './authenticate-orgs'
import { InvalidCredentialsError } from './errors/invalid-credentials'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgsUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgsUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      address: 'Rua Sao Miguel 239A',
      cep: '38190-000',
      city: 'Sacramento',
      state: 'MG',
      whatsapp: '34984160439',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'wrong-email@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      address: 'Rua Sao Miguel 239A',
      cep: '38190-000',
      city: 'Sacramento',
      state: 'MG',
      whatsapp: '34984160439',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
