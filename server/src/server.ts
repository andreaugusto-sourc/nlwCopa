import Fastify from "fastify"
import { PrismaClient } from "@prisma/client"
import cors from '@fastify/cors'

// conexao com o prisma
const prisma = new PrismaClient({
    log: ['query'],
})

// conexao com o fastify
async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors,{
        origin: true,
    })
    
// rota e contagem de boloes
    fastify.get('/pools/count', async () =>{
        const count = await prisma.pool.count()
        return {count}
    })

    await fastify.listen({ port: 3333, /*host: '0.0.0.0' */})
}


bootstrap()
