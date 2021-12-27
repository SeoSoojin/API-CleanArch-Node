export const DbConfig = {

    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'Yeodinha-4',
    port: process.env.POSTGRES_PORT as unknown as number || 5432

};
