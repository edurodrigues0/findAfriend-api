import { FastifyInstance } from 'fastify'
import { register } from './register'
import { info } from './info'
import { search } from './search'
import { fetch } from './fetch'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', register)
  app.get('/pets/:petId/info', info)
  app.get('/pets/search', search)
  app.get('/pets/fetch', fetch)
}
