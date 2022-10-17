const responseHelper = require("../helper/responseHelper");
const { SERVER_ERROR } = require("../utils/constVariables");
const axios = require('axios');
const oAuth2Client = require("../config/oAuth2Client");
const { auth } = require("../config/nodemailer");
const nodemailer = require(`nodemailer`);
const { MAIL_SERVICE } = require("../config/env");

module.exports = {
    // get user email from gmail service
    getEmail: async (req, res, next) => {
        try {
            const { email } = req.user;

            const responseData = await getMessages(email);
            const messageArray = await readMail(email, responseData);

            return responseHelper(true, 'Email fetched', 200, '', messageArray, res);
        } catch (error) {
            return responseHelper(false, SERVER_ERROR, 500, '', {}, res);
        }
    },
    // send email controller
    sendEmail: async (req, res, next) => {
        try {
            const { email, subject, text } = req.body;
            const { token } = await oAuth2Client.getAccessToken();

            const transport = nodemailer.createTransport({
                service: MAIL_SERVICE,
                auth: {
                    ...auth,
                    accessToken: token,
                },
            });

            const mailOptions = {
                from: req.user['email'], // sender
                to: email, // receiver
                subject: subject, // Subject
                text: text,
            };

            const result = await transport.sendMail(mailOptions);
            return responseHelper(true, 'Email sent', 200, '', result, res);
        } catch (error) {
            return responseHelper(false, SERVER_ERROR, 500, '', {}, res);
        }
    }
}

//fuction to get access token
const getMessages = async (email) => {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${email}/messages`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    return response.data;
}

// function to read user email
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

// function to generate config from url and access token
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