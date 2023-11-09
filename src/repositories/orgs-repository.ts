import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findWhatsappById(id: string): Promise<string | null>
  findByEmail(email: string): Promise<Org | null>
  findPetsByCity(city: string, state: string): Promise<Org[] | null>
}
