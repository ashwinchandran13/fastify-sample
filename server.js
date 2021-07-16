const fastify = require('fastify')({logger: true})
fastify.register(require('fastify-cors'), { 
    // put your options here
  })
fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: { title: 'fastify-api' },
        tags: [
            { name: 'user', description: 'User related end-points' },
            { name: 'code', description: 'Code related end-points' }
        ],
        
    }
})
fastify.register(require('./routes/items'))
fastify.register(require('./routes/things'))


const PORT = 5000

const start = async () => {
    try {
        await fastify.listen(PORT)
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()