import * as Express from 'express';
import { Client } from 'pg';


type Name = { name: string };

export const server = (port: number | string): void => {
    const express = Express();

    express.get('/', (req: Express.Request, res: Express.Response) => res.send(`Hello World! ${port}`));

    express.route('/test-pg')
        .get((req: Express.Request, res: Express.Response) => {
            const defaultConfig = {
                host: 'localhost', // server name or IP address;
                port: 5432,
                database: 'herokutestdb',
                user: 'tdat',
                password: '',
            };

            const prodConfig = {
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false,
                },
            };

            const client = new Client(process.env.NODE_ENV === 'development' ? defaultConfig : prodConfig);

            client.connect();

            client.query('SELECT * FROM public.names;', (err, pgRes) => {
                if (err) throw err;

                client.end();
                res.json(pgRes.rows);
            });
        });

    express.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
};
