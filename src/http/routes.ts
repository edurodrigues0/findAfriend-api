import { FastifyInstance } from 'fastify'
import { registerOrgs } from './controllers/register-orgs'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrgs)
}
