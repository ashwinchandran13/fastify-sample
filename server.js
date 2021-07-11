const fastify = require('fastify')({logger: true})
const PORT = 5000

const items = require('./Items')

fastify.get('/items', (req, reply) => {
    reply.send(items)
})

const start = async () => {
    try {
        await fastify.listen(PORT)
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()