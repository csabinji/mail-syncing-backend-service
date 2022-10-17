const { CLIENT_ID, CLIENT_SECRET, CODE, REDIRECT_URL, GRANT_TYPE, GET_ACCESS_TOKEN_URL } = require("../config/env");
const responseHelper = require("../helper/responseHelper");
const { SERVER_ERROR } = require("../utils/constVariables");
const axios = require('axios');
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

module.exports = {
    getEmail: async (req, res, next) => {
        try {
            const { email } = req.user;

            const responseData = await getAccesToken(email);
            const messageArray = await readMail(email, responseData);

            return responseHelper(true, 'Email fetched', 200, '', messageArray, res);
        } catch (error) {
            return responseHelper(false, SERVER_ERROR, 500, '', {}, res);

        }
    }
}

const getAccesToken = async (email) => {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${email}/messages`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    return response.data;
}

const generateConfig = (url, accessToken) => {
    return {
        method: "get",
        url: url,
        headers: {
            Authorization: `Bearer ${accessToken} `,
            "Content-type": "application/json",
        },
    };
};

const readMail = async (email, messages) => {
    const messageArray = await Promise.all(messages?.messages.map(async (message) => {
        const url = `https://gmail.googleapis.com//gmail/v1/users/${email}/messages/${message.threadId}`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config);

        let data = await response.data;
        return data;
    }));
    return messageArray;
}