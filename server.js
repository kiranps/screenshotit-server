const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const screenShotRouter = require('./functions/screenshot');

const app = express();
app.use(bodyParser.json({limit: "50mb"})); 
app.use(cors({origin: true}))
app.use('/screenshot', screenShotRouter);

const PORT = 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);