import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const basePath = path.resolve(__dirname, "../");

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [`${basePath}/entities/**/*{.ts,.js}`],
  migrations: [`${basePath}/migrations/**/*{.ts,.js}`],
  cli: {
    entitiesDir: `${basePath}/entities`,
    migrationsDir: `${basePath}/migrations`,
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export = config;
