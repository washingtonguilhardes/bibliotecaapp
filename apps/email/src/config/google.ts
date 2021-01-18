import { join } from 'path';

export default {
  credentialsFile: join(`${process.cwd()}/.google/credentials.json`),
  tokenFile: join(`${process.cwd()}/.google/token.json`),
};
