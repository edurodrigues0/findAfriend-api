import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await request(app.server).post('/orgs').send({
    responsibleName: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
    address: 'Rua Sao Miguel, 239A, Chafariz',
    city: 'Sacramento',
    state: 'MG',
    cep: '38190-000',
    whatsapp: '(34) 9 98424-9953',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
