const env = process.env;

module.exports = {
    APP_DEBUG: env['APP_DEBUG'],
    ACCESS_TOKEN_LIFETIME: env['ACCESS_TOKEN_LIFETIME'],
    CODE: env['CODE'],
    CLIENT_ID: env['CLIENT_ID'],
    CLIENT_SECRET: env['CLIENT_SECRET'],
    GET_ACCESS_TOKEN_URL: env['GET_ACCESS_TOKEN_URL'],
    GRANT_TYPE: env['GRANT_TYPE'],
    MONGO_DB_URL: env['MONGO_DB_URL'],
    PORT: env['PORT'],
    REDIRECT_URL: env['REDIRECT_URL'],
}