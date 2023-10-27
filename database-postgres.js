import { sql } from './db.js'

export class DatabasePostgres {

    async get() {
        const clima = await sql`SELECT ID, DATA, TEMPERATURA, UMIDADE FROM TEMPERATURA`;
        return clima;
    }

    async getData(data) {
        const clima = await sql`SELECT ID, DATA, TEMPERATURA, UMIDADE FROM TEMPERATURA WHERE DATA = ${data}`;
        return clima;
    }

    async create(clima) {
        const { data, temperatura, umidade } = clima;
        await sql`INSERT INTO TEMPERATURA (DATA, TEMPERATURA, UMIDADE) VALUES (${data}, ${temperatura}, ${umidade})`;
    }

    async delete() {
        const deleteClima = await sql`DELETE FROM TEMPERATURA WHERE DATA < CURRENT_DATE - INTERVAL '7' DAY;`;
        return deleteClima;
    }
}