import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterOrgUseCase } from '@/use-cases/register-orgs'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    responsibleName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.string(),
    cep: z.string(),
    address: z.string(),
  })

  const { responsibleName, email, password, whatsapp, cep, address } =
    registerBodySchema.parse(request.body)

  try {
    const prismaOrgsRepository = new PrismaOrgsRepository()
    const registerOrgUseCase = new RegisterOrgUseCase(prismaOrgsRepository)

    await registerOrgUseCase.execute({
      responsibleName,
      email,
      password,
      whatsapp,
      cep,
      address,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
