class Scraper {
  constructor(puppeteerService) {
    this.puppeteerService = puppeteerService;
    this.tableData = [];
  }

  async scrapePageData() {
    const data = await this.puppeteerService.evaluatePage(() => {
      const tables = document.querySelectorAll("#cityOverview table");
      const result = [];
      const tableKeyClasses = [
        ".contTextOverviewGITextBold",
        ".contTextOverviewWSTextBold,.contTextOverviewWSText i",
        ".contTextOverviewWWTextBold,.contTextOverviewWWText i",
        ".contTextOverviewSWMTextBold,.contTextOverviewWWText",
      ];
      const tableValueClasses = [
        ".contTextOverviewGIValue div",
        ".contTextOverviewWSValue div",
        ".contTextOverviewWWValue div",
        ".contTextOverviewSWMValue div",
      ];

      tables.forEach((table, tableIndex) => {
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach((row) => {
          const keys = row.querySelectorAll(tableKeyClasses[tableIndex]);
          const values = row.querySelectorAll(tableValueClasses[tableIndex]);

          if (keys.length > 0 && values.length > 0) {
            for (let i = 0; i < keys.length; i++) {
              result.push([
                keys[i].innerText.trim(),
                values[i].innerText.trim().replace(/,/g, ""),
              ]);
            }
          }
        });
      });

      return result;
    });

    this.tableData = [...this.tableData, ...data];
  }

  getTableData() {
    return this.tableData;
  }

  resetTableData() {
    this.tableData = [];
  }
}

module.exports = Scraper;
