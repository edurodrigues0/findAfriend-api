import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Fetch pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets', async () => {
    await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    await request(app.server)
      .post('/pets')
      .send({
        name: 'Alfredo',
        description:
          'Eu sou um lindo doguinho de 3 anos, um jovem brincalhao que adora fazer companhia, uma arte mas tambem ama uma soneca.',
        age: 'PUPPY',
        energy: 'HIGH',
        size: 'SMALL',
        environment: 'INDOOR',
        independece: 'MEDIUM',
        orgId: org.id,
        requisites: [
          'Local grande para o animal correr e brincar',
          'Proibido apartamento',
        ],
        images: [],
      })

    const response = await request(app.server)
      .get('/pets/fetch')
      .query({
        city: 'Sacramento',
        state: 'MG',
        page: 1,
      })
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
