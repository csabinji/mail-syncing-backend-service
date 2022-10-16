const { Router } = require('express');
const passport = require('passport');
const authRoute = require('../routes/auth.route');

module.exports = () => {
    const router = Router();
    authRoute(router, passport);
    return router;
};