const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const xss = require('xss-clean');
const mongoSanitizer = require('express-mongo-sanitize');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');

const ownerRoute = require('./routes/risk-owner.route');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet({ contentSecurityPolicy: false }));

app.use('/api/v1/owner', ownerRoute);


app.use(mongoSanitizer());
app.use(xss());

app.all('*', (req, res, next) => {
    next(`Can't find ${req.originalUrl} on this server!`);
});

module.exports = app;