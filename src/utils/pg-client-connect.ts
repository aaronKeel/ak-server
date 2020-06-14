import { Client } from 'pg';

export const pgClientConnect = <T>(queryString: string): Promise<T[]> => {
    return new Promise((resolve) => {
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
    
        client.query(queryString, (err, pgRes) => {
            if (err) throw err;
    
            client.end();
            resolve(pgRes.rows);
        });
    });
};
