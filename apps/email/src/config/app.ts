export default {
  API_SERVICE_PORT: '3000',
  API_SERVICE_DB_NAME: 'appdb',
  API_SERVICE_DB_HOST: 'localhost',
  API_SERVICE_DB_USERNAME: 'root',
  API_SERVICE_DB_PASSWORD: 'root',
  API_SERVICE_DB_PORT: '3306',

  EMAIL_SERVICE_PORT: '3002',
  EMAIL_SERVICE_DB_NAME: 'emaildb',
  EMAIL_SERVICE_DB_HOST: 'localhost',
  EMAIL_SERVICE_DB_USERNAME: 'root',
  EMAIL_SERVICE_DB_PASSWORD: 'root',
  EMAIL_SERVICE_DB_PORT: '3306',
  EMAIL_SERVICE_QUEUE_URI: 'amqp://guest:guest@localhost:5672',
  EMAIL_SERVICE_QUEUE_NAME: 'emailqueue',

  GOOGLE_SERVICE_CREDENTIAL: '.google/credentials.json',
  GOOGLE_SERVICE_TOKEN: '.google/token.json',
}