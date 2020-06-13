import * as Express from 'express';

export const server = (port: number | string): void => {
    const express = Express();
    
    express.get('/', (req: Express.Request, res: Express.Response) => res.send('Hello World!'));
    
    express.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
};
