import { prisma } from '@/lib/prisma'
import { PrismaOrgsRepository } from '@/repositories/prisma-orgs-repository'
import { hash } from 'bcryptjs'

interface RegisterOrgsUseCaseRequest {
  responsibleName: string
  email: string
  password: string
  cep: string
  whatsapp: string
  address: string
}

export async function registerOrgUseCase({
  responsibleName,
  email,
  password,
  address,
  cep,
  whatsapp,
}: RegisterOrgsUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const orgsWithSameEmai = await prisma.org.findUnique({
    where: {
      email,
    },
  })

  if (orgsWithSameEmai) {
    throw new Error('E-mail already exists.')
  }

  const prismaOrgsRepository = new PrismaOrgsRepository()

  await prismaOrgsRepository.create({
    responsible_name: responsibleName,
    email,
    password_hash,
    address,
    cep,
    whatsapp,
  })
}
