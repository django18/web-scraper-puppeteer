const puppeteer = require("puppeteer");

class PuppeteerService {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async launchBrowser() {
    this.browser = await puppeteer.launch({ headless: true });
    this.page = await this.browser.newPage();
  }

  async goToUrl(url) {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async takeScreenshot(path) {
    await this.page.screenshot({ path, fullPage: true });
  }

  async clickSelector(selector) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async waitForNetworkIdle(idleTime = 500, timeout = 30000) {
    await this.page.waitForNetworkIdle({ idleTime, timeout });
  }

  async selectOption(selector, value) {
    await this.page.select(selector, value);
  }

  async getOptions(selector) {
    return this.page.$$eval(selector, (options) =>
      options
        .filter((option) => option.value !== "-1")
        .map((option) => ({
          optionKey: option.value,
          value: option.innerHTML.trim(),
        }))
    );
  }

  async evaluatePage(func) {
    return this.page.evaluate(func);
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

module.exports = PuppeteerService;
