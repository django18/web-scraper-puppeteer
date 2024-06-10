const PuppeteerService = require("./PuppeteerService");
const CSVService = require("./CSVService");
const Scraper = require("./Scraper");

(async () => {
  const puppeteerService = new PuppeteerService();
  const csvService = new CSVService(
    path.join(__dirname, "scraped_data_table.csv")
  );
  const scraper = new Scraper(puppeteerService);

  await puppeteerService.launchBrowser();
  const url =
    "https://www.pas.org.in/web/ceptpas/knowyourcity?p_p_id=Knowyourcity_WAR_Portal&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&actionVal=Retrieve&SkipAccessChecking=false";
  await puppeteerService.goToUrl(url);
  await puppeteerService.takeScreenshot("screenshot.png");
  await puppeteerService.clickSelector("#idSubmitCMP");
  await puppeteerService.waitForNetworkIdle();

  const dropdown1Options = await puppeteerService.getOptions(
    "#cmbStateKYCOverView option"
  );

  for (let stateOption of dropdown1Options) {
    await puppeteerService.selectOption(
      "#cmbStateKYCOverView",
      stateOption.optionKey
    );
    const dropdown2Options = await puppeteerService.getOptions(
      "#cmbYearKYCOverView option"
    );
    const dropdown3Options = await puppeteerService.getOptions(
      "#cmbCityKYCOverView option"
    );

    for (const option2 of dropdown2Options) {
      await puppeteerService.selectOption(
        "#cmbYearKYCOverView",
        option2.optionKey
      );
      for (const option3 of dropdown3Options) {
        scraper.resetTableData();
        await puppeteerService.selectOption(
          "#cmbCityKYCOverView",
          option3.optionKey
        );
        await puppeteerService.clickSelector("#idSubmitKYCOverView");
        await puppeteerService.waitForNetworkIdle();

        await scraper.scrapePageData();

        csvService.addRows(scraper.getTableData());
      }
    }

    csvService.saveToFile();
  }

  await puppeteerService.closeBrowser();
})();
