const controller = require('../controllers/mail.controller');

module.exports = (router, passport) => {
    router.get('/get-email', passport.authenticate(`bearer`, { session: false }), controller.getEmail);
    router.post('/send-email', passport.authenticate(`bearer`, { session: false }), controller.sendEmail);
};

