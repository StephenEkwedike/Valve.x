import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: ['src/typeorms/entities/**/*.ts'],
  migrations: ['src/typeorms/migrations/**/*.ts'],
  cli: {
    entitiesDir: 'src/typeorms/entities',
    migrationsDir: 'src/typeorms/migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export default config;
