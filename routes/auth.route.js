const controller = require('../controllers/auth.controller');

module.exports = (router, passport) => {
    router.post('/register', controller.register);
    router.post('/login', controller.login);
};

