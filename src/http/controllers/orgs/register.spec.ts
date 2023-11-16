import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register org', async () => {
    const response = await request(app.server).post('/orgs').send({
      responsibleName: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Rua Sao Miguel, 239A, Chafariz',
      city: 'Sacramento',
      state: 'MG',
      cep: '38190-000',
      whatsapp: '(34) 9 98424-9953',
    })

    expect(response.statusCode).toEqual(201)
  })
})
