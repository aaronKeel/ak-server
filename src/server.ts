import * as Express from 'express';
import { pgClientConnect } from './utils/pg-client-connect';


type Name = {
    id: number;
    name: string;
};

export const server = (port: number | string): void => {
    const express = Express();

    express.get('/', (req: Express.Request, res: Express.Response) => res.send(`Hello World! ${port}`));

    express.route('/test-pg')
        .get(async (req: Express.Request, res: Express.Response) => {
            const rows = await pgClientConnect<Name>('SELECT * FROM public.names;');
            res.json(rows);
        });

    express.route('/test-ghs')
        .get(async (req: Express.Request, res: Express.Response) => {
            const rows = await pgClientConnect<Name>('SELECT * FROM public.ghs;');
            res.json(rows);
        });

    express.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
};
