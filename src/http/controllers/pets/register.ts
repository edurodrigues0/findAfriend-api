import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterPetUseCase } from '@/use-cases/register-pets'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const ageEnum = ['PUPPY', 'ADULT', 'SENIOR', 'ELDERLY'] as const
  const sizeEnum = ['SMALL', 'MEDIUM', 'LARGE'] as const
  const energyEnum = ['LOW', 'MEDIUM', 'HIGH'] as const
  const independeceEnum = ['LOW', 'MEDIUM', 'HIGH'] as const
  const environmentEnum = [
    'SPACIOUS',
    'INDOOR',
    'OUTDOOR',
    'QUIET',
    'OTHER',
  ] as const

  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    requisites: z.array(z.string()),
    age: z.enum(ageEnum),
    images: z.array(z.string()),
    energy: z.enum(energyEnum),
    environment: z.enum(environmentEnum),
    independece: z.enum(independeceEnum),
    size: z.enum(sizeEnum),
    orgId: z.string(),
  })

  const {
    name,
    description,
    orgId,
    age,
    energy,
    environment,
    images,
    independece,
    requisites,
    size,
  } = registerBodySchema.parse(request.body)

  try {
    const prismaPetsRepository = new PrismaPetsRepository()
    const registerPetsUseCase = new RegisterPetUseCase(prismaPetsRepository)

    await registerPetsUseCase.execute({
      name,
      description,
      requisites,
      age,
      energy,
      environment,
      images,
      independece,
      orgId,
      size,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
