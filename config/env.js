const env = process.env;

module.exports = {
    APP_DEBUG: env['APP_DEBUG'],
    ACCESS_TOKEN_LIFETIME: env['ACCESS_TOKEN_LIFETIME'],
    MONGO_DB_URL: env['MONGO_DB_URL'],
    PORT: env['PORT'],
}