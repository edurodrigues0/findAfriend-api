import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Info pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet info', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
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

    const pet = await prisma.pet.findFirstOrThrow()

    const response = await request(app.server)
      .get(`/pets/${pet.id}/info`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: pet.id,
      }),
    )
  })
})
