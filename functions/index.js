const express = require('express');
const bodyParser = require('body-parser');
const functions = require('firebase-functions');
const puppeteer = require('puppeteer');
const cors = require('cors')

const app = express();
app.use(bodyParser.json({limit: "50mb"})); 
app.use(cors({origin: true}))


app.get('/test', (req, res) => {
  res.send('test');
});

// // Init code that gets run before all request handlers.
app.all('*', async (req, res, next) => {
  res.locals.browser = await puppeteer.launch({args: ['--no-sandbox']});
  next(); // pass control on to router.
});

app.post('/screenshot', async function screenshotHandler(req, res) {
  const width = req.body.width;
  const height = req.body.height;
  const html = req.body.html
  console.log("hello world")

  const viewport = {
    width,
    height,
    deviceScaleFactor: 1
  };

  let fullPage = true;
  const browser = res.locals.browser;

  try {
    const page = await browser.newPage();
    const opts = {
      fullPage,
    }

    await page.setViewport(viewport)
    await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle2' });

    const buffer = await page.screenshot(opts);
    res.type('image/png').send(buffer);
  } catch (e) {
    res.status(500).send(e.toString());
  }

  await browser.close();
});

const beefyOpts = {memory: '2GB', timeoutSeconds: 60};
exports.screenshot = functions.runWith(beefyOpts).https.onRequest(app);
exports.test = functions.https.onRequest(app);