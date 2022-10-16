const responseHelper = require("../helper/responseHelper");
const tokenGenerator = require("../helper/tokenGenerator");
const { User } = require("../models");
const { SERVER_ERROR } = require("../utils/constVariables");

module.exports = {
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
                return responseHelper(false, 'Password and confirm password does not match.', 409, '', {}, res);
            }

            const user = await User.create(userData);

            // Generate Token
            const tokens = await tokenGenerator(user);
            return responseHelper(true, 'User account created.', 200, '', tokens, res);
        } catch (error) {
            return responseHelper(false, SERVER_ERROR, 500, ``, {}, res);
        }
    }
}