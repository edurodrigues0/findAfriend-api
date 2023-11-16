import { makeGetPetInfoUseCase } from '@/use-cases/factories/make-get-pet-info-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function info(request: FastifyRequest, reply: FastifyReply) {
  const infoParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = infoParamsSchema.parse(request.params)

  const getPetInfo = makeGetPetInfoUseCase()

  const { pet } = await getPetInfo.execute({
    petId,
  })

  return reply.status(200).send({ pet })
}
