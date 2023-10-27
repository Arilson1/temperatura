import fastify from "fastify";
import { DatabasePostgres } from './database-postgres.js';

const app = fastify();

const db = new DatabasePostgres();

app.get("/", async (request, reply) => {
    const clima = await db.get();
    return reply.status(201).send(clima);
});

app.get("/data", async (request, reply) => {
    const data = request.query.search;
    const clima = await db.getData(data);
    return reply.status(201).send(clima);
});

app.post("/", async (request, reply) => {
    const { data, temperatura, umidade } = request.body;

    await db.create({
        data,
        temperatura,
        umidade
    });

    return reply.status(201).send();
});

app.delete("/", async (request, reply) => {
    await db.delete();
    return reply.status(204).send();
});

app.listen({ 
    host: '0.0.0.0',
    port: process.env.PORT ?? 3000,
});