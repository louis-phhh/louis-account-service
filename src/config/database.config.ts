import { registerAs } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  logging: process.env.DB_LOGGING === 'true',
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  synchronize: false,
  options: {},
  migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
  cli: { migrationsDir: 'db/migrations' },
  namingStrategy: new SnakeNamingStrategy(),
}));
