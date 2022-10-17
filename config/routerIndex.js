const { Router } = require('express');
const passport = require('passport');
const authRoute = require('../routes/auth.route');
const mailRoute = require('../routes/mail.route');

module.exports = () => {
    const router = Router();
    authRoute(router, passport);
    mailRoute(router, passport);
    return router;
};