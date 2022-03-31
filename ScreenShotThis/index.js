const puppeteer = require("puppeteer");
const wait = require("waait");

const cached = new Map();

module.exports = async function (context, req) {
    context.log('👀 JavaScript HTTP trigger function processed a request.');

    const qs = new URLSearchParams(req.query);
    console.log(`👋 {you:url-to-screenshot}?${qs.toString()}`);
    const screenshotBuffer = await getScreenshot(
        `{you:url-to-screenshot}?${qs.toString()}`
    );
    context.res = {
        body: screenshotBuffer,
        headers: {
            "content-type": "image/jpeg",
        },
    };
};

async function getScreenshot(url) {
    // first check if this value has been cached
    const cachedImage = cached.get(url);

    if (cachedImage) {
        // return cachedImage;
    }

    const browser = await puppeteer.launch({
        //pass options like font
        defaultViewport: null,
        captureBeyondViewport: false,
        args: [
            '--start-maximized',
        ],
        // headless: true,
    });
    const page = await browser.newPage();

    // await page.setViewport({ width: 1200, height: 630 });
    await page.goto(url);
    await page.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: 'dark' },
    ])

    await wait(1000);

    const buffer = await page.screenshot({
        fullPage: true,
    });
    cached.set(url, buffer);

    await page.close();
    await browser.close();

    return buffer;
}