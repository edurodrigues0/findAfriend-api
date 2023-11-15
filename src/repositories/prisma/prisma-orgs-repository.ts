import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async findWhatsappById(id: string) {
    const org = await prisma.org.findUniqueOrThrow({
      where: {
        id,
      },
    })

    const { whatsapp } = org

    return {
      whatsapp,
    }
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
