import { Prisma, Org, Role, $Enums } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org: Org = {
      id: data.id ?? randomUUID(),
      responsible_name: data.responsible_name,
      email: data.email,
      password_hash: data.password_hash,
      cep: data.cep,
      city: data.city,
      state: data.state,
      address: data.address,
      whatsapp: data.whatsapp,
      created_at: new Date(),
      role: Role.ADMIN,
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findPetsByCity(city: string, state: string) {
    const orgs = this.items.filter((item) => {
      return item.city === city && item.state === state
    })

    return orgs
  }
}
