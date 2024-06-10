const fs = require("fs");
const path = require("path");

class CSVService {
  constructor(filePath) {
    this.filePath = filePath;
    this.csvContents = "";
  }

  addRows(rows) {
    rows.forEach((row) => {
      const csvContent = row.join(",").concat("\n");
      this.csvContents += csvContent;
    });
    this.csvContents = this.csvContents.concat("\n\n"); // Add empty row between tables
  }

  saveToFile() {
    fs.writeFileSync(this.filePath, this.csvContents);
  }
}

module.exports = CSVService;
