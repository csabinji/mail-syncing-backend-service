const env = process.env;

module.exports = {
    APP_ENV: env['APP_ENV'],
    API_URL: env['API_URL'],
    API_HOST: env['API_HOST'],
    APP_DEBUG: env['APP_DEBUG'],
    ACCESS_TOKEN_LIFETIME: env['ACCESS_TOKEN_LIFETIME'],

    CLIENT_ID: env['CLIENT_ID'],
    CLIENT_SECRET: env['CLIENT_SECRET'],

    MAIL_SERVICE: env['MAIL_SERVICE'],
    MAIL_ACCOUNT: env['MAIL_ACCOUNT'],
    MONGO_DB_URL: env['MONGO_DB_URL'],

    PORT: env['PORT'],

    REDIRECT_URL: env['REDIRECT_URL'],
    REFRESH_TOKEN: env['REFRESH_TOKEN'],
}