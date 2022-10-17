const nodemailer = require(`nodemailer`);
const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = require("./env");

const auth = {
    type: "OAuth2",
    user: "sabinakanodeji@gmail.com",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: auth
});

module.exports = { transporter, auth };

