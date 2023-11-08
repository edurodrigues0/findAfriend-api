import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgsAlreadyExistsError } from './errors/orgs-already-exists'
import { Org } from '@prisma/client'

interface RegisterOrgsUseCaseRequest {
  responsibleName: string
  email: string
  password: string
  cep: string
  whatsapp: string
  address: string
  city: string
  state: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    responsibleName,
    email,
    password,
    city,
    state,
    address,
    cep,
    whatsapp,
  }: RegisterOrgsUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgsWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgsWithSameEmail) {
      throw new OrgsAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      responsible_name: responsibleName,
      email,
      password_hash,
      city,
      state,
      address,
      cep,
      whatsapp,
    })

    return {
      org,
    }
  }
}
