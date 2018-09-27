const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

router.post('/', async function(req, res, next) {
  const width = req.body.width;
  const height = req.body.height;
  const html = req.body.html

  const viewport = {
    width,
    height,
    deviceScaleFactor: 1
  };

  let fullPage = true;
  const browser = await puppeteer.launch({args: ['--no-sandbox']});

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

router.get('/test', (req, res, next) => {
  res.send('test');
});

module.exports = router;