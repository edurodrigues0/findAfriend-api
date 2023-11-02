import fastify from 'fastify'
import { appRoutes } from './http/controllers/orgs/routes'

export const app = fastify()

app.register(appRoutes)
