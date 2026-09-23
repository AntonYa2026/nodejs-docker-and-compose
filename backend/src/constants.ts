export const PORT = Number(process.env.PORT ?? 3000);

export const POSTGRES_HOST = process.env.POSTGRES_HOST ?? 'localhost';
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT ?? 5432);
export const POSTGRES_USER = process.env.POSTGRES_USER ?? 'postgres';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD ?? '123123';
export const POSTGRES_DB = process.env.POSTGRES_DB ?? 'kupipodariday';
