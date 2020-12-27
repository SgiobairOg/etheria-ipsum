require('make-promises-safe')
const fastify = require('fastify')({ logger: true })
const fastifyEnv = require('fastify-env')

const { routeListHook } = require('./src/utility/routeList')
const { routes } = require('./src/v1/routes')
console.log('Hook: ', routeListHook)
const envSchema = {
  type: 'object',
  required: [ 'PORT' ],
  properties: {
    PORT: {
      type: 'string',
      default: 3000
    }
  }
}
 
const envOptions = {
  schema: envSchema,
  dotenv: true,
}


fastify.addHook('onRoute', routeListHook)

fastify.register(routes, { prefix: '/v1' })

fastify
  .register(fastifyEnv, envOptions)
  .ready((err) => {
    if (err) fastify.log.error(err)

    fastify.log.info(fastify.config)
    start()
  })

const start = async () => {
  try {
    await fastify.listen(fastify.config.PORT)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
