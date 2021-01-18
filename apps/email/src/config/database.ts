import { ConnectionOptions } from 'typeorm';

export default {
  type: 'mysql',
  host: process.env.EMAIL_SERVICE_DB_HOST,
  username: process.env.EMAIL_SERVICE_DB_USERNAME,
  password: process.env.EMAIL_SERVICE_DB_PASSWORD,
  database: process.env.EMAIL_SERVICE_DB_NAME,
  sync: process.env.EMAIL_SERVICE_DB_SYNC == 'true',
  port: parseInt(process.env.EMAIL_SERVICE_DB_PORT),
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  logging: true,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'apps/email/src/migrations',
  },
} as ConnectionOptions;
