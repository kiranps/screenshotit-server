const express = require('express');
const bodyParser = require('body-parser');
const functions = require('firebase-functions');
const cors = require('cors')
const app = express();

const screenShotRouter = require('./screenshot');

app.use(bodyParser.json({limit: "50mb"})); 
app.use(cors({origin: true}))
app.use('/screenshot', screenShotRouter);

const beefyOpts = {memory: '2GB', timeoutSeconds: 60};
exports.screenshot = functions.runWith(beefyOpts).https.onRequest(app);
exports.test = functions.https.onRequest(app);