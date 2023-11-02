import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { registerOrgUseCase } from '@/use-cases/register-orgs'

export async function registerOrgs(
  request: FastifyRequest,
  reply: FastifyReply,
) {
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
    await registerOrgUseCase({
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
