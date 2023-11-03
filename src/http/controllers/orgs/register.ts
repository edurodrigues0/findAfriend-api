import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterOrgUseCase } from '@/use-cases/register-orgs'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { OrgsAlreadyExistsError } from '@/use-cases/errors/orgs-already-exists'

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
    if (err instanceof OrgsAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
