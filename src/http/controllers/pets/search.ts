import { makeSearchPetsByCharacteristicsUseCase } from '@/use-cases/factories/make-search-pets-by-characteristics-use-case'
import {
  ageEnum,
  energyEnum,
  environmentEnum,
  independeceEnum,
  sizeEnum,
} from '@/utils/enums'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    state: z.string(),
    page: z.coerce.number().min(1).default(1),
    age: z.enum(ageEnum).optional(),
    energy: z.enum(energyEnum).optional(),
    size: z.enum(sizeEnum).optional(),
    environment: z.enum(environmentEnum).optional(),
    independece: z.enum(independeceEnum).optional(),
  })

  const { city, state, page, age, energy, environment, independece, size } =
    searchPetsQuerySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsByCharacteristicsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
    state,
    page,
    age,
    energy,
    environment,
    independece,
    size,
  })

  console.log(pets)

  return reply.status(200).send({
    pets,
  })
}
