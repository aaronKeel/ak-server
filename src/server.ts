import * as Express from 'express';
import { Client } from 'pg';


type Name = { name: string };

export const server = (port: number | string): void => {
    const express = Express();

    express.get('/', (req: Express.Request, res: Express.Response) => res.send('Hello World!'));

    express.route('/test-pg')
        .get((req: Express.Request, res: Express.Response) => {
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false,
                },
            });

            client.connect();

            client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, pgRes) => {
                if (err) throw err;

                client.end();
                res.json(pgRes.rows);
            });
        });

    express.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
};
