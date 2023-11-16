import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsQuerySchema = z.object({
    city: z.string(),
    state: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, state, page } = fetchPetsQuerySchema.parse(request.query)

  const fetchPetsUseCase = makeFetchPetsUseCase()

  const { pets } = await fetchPetsUseCase.execute({
    city,
    state,
    page,
  })

  return reply.status(200).send({
    pets,
  })
}
