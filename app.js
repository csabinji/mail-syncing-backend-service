require('dotenv').config();
const express = require('express');
const app = express();
const { router, cors, passport } = require('./config');
const { PORT } = require('./config/env');

require(`./config/dbConnection`);

// passport js
app.use(passport.initialize());

app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(express.json());

// cors imlementation
app.use(cors);

// Routes setup
const apiRoutes = router();

app.use("/api/v1", apiRoutes);

// no route 404 response
app.use((req, res, next) => {
    if (!req.route) {
        return res.json('requested resource is not avaiable yet');
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

module.exports = app;