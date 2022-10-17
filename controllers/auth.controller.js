const responseHelper = require("../helper/responseHelper");
const tokenGenerator = require("../helper/tokenGenerator");
const { User, AccessToken } = require("../models");
const { SERVER_ERROR, PASSWORD_NOT_MATCHED } = require("../utils/constVariables");
const bcrypt = require('bcryptjs');

module.exports = {
    // Register controller
    register: async (req, res, next) => {
        try {
            const userData = req.body;

            // Check user with same email address
            const userWithSameEmail = await User.findOne({ email: userData['email'] }).lean();
            if (userWithSameEmail) {
                return responseHelper(false, 'Email already exists', 409, '', {}, res);
            }

            // Check password and confirm password
            if (userData['password'] != userData['confirm_password']) {
                return responseHelper(false, PASSWORD_NOT_MATCHED, 409, '', {}, res);
            }
            // Password hashing
            const hash = await bcrypt.hash(userData['password'], 10);

            const user = await User.create({ ...userData, password: hash });

            // Generate Token
            const tokens = await tokenGenerator(user);
            return responseHelper(true, 'User account created.', 200, 'Authentication', tokens, res);
        } catch (error) {
            return responseHelper(false, SERVER_ERROR, 500, '', {}, res);
        }
    },
    // Login controller
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            // Check user existance
            const user = await User.findOne({ email }).exec();
            if (!user) return responseHelper(false, 'User does not exist.', 403, '', {}, res);

            // Check password
            const matchPassword = await bcrypt.compare(password, user['password']);
            if (!matchPassword) return responseHelper(false, 'Incorrect email or password', 403, '', {}, res);

            // Generate Token
            const tokens = await tokenGenerator(user);
            return responseHelper(true, 'Login success', 200, 'Authentication', tokens, res);
        } catch (error) {
            return responseHelper(false, SERVER_ERROR, 500, '', {}, res);
        }
    },
    // logout controller
    logout: async (req, res, next) => {
        try {
            await req.user.remove();
            await AccessToken.deleteOne({
                token: req.user['token'],
            });
            return responseHelper(true, 'Logout success', 200, 'Authentication', {}, res);
        } catch (error) {
            console.log(error);
            return responseHelper(false, SERVER_ERROR, 500, '', {}, res);
        }
    },
};