import { prisma } from '@/lib/prisma'
import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async findPetsByCity(city: string, state: string) {
    const org = await prisma.org.findMany({
      where: {
        city,
        state,
      },
    })

    return org
  }
}
