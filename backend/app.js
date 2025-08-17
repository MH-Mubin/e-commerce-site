// Basic Lib Import
const express = require('express');
const app = express();
const router = require('./src/routes/api');
const bodyParser = require('body-parser');


// Security Middleware Lib Import
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

// Database Lib Import
const mongoose = require('mongoose');

// Security Middleware Implementation
app.use(helmet());
app.use(cors());
app.use(mongoSanitize({
    replaceWith: '_'
  }));
app.use(hpp());

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));


// Body Parser Implementation
app.use(bodyParser.json());

// Rate Limiter Implementation
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5000, // Limit each IP to 5000 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);


// MongoDB Connection

require('dotenv').config();
const mongo_url = process.env.mongo_url;
// console.log('Mongo URI:', process.env.mongo_url);

let OPTION = {user:"", pass:"", autoIndex: true}
mongoose.connect(mongo_url, OPTION).then(() => {
    console.log("Database Connected Successfully");
}).catch((err) => {
    console.log(err);
});



// Routing implementation
//app.use('/api/v1', router);

module.exports = app;