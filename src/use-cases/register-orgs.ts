import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'

interface RegisterOrgsUseCaseRequest {
  responsibleName: string
  email: string
  password: string
  cep: string
  whatsapp: string
  address: string
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    responsibleName,
    email,
    password,
    address,
    cep,
    whatsapp,
  }: RegisterOrgsUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const orgsWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgsWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    await this.orgsRepository.create({
      responsible_name: responsibleName,
      email,
      password_hash,
      address,
      cep,
      whatsapp,
    })
  }
}
