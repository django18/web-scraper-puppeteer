# Web Scraper with Puppeteer

This project is a web scraper built using [Puppeteer](https://github.com/puppeteer/puppeteer) to extract data from a specified webpage, process it, and save it as a CSV file. The scraper handles multiple dropdown selections to gather comprehensive data from different states, years, and cities.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Code Structure](#code-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Automated browser interactions using Puppeteer
- Data extraction and processing from dynamic web pages
- Saving extracted data into a CSV file
- Modular code structure following SOLID principles

## Prerequisites

- [Node.js](https://nodejs.org/en/) (version 14.x or higher)
- npm (Node package manager)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/web-scraper-puppeteer.git
   cd web-scraper-puppeteer
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

## Usage

1. **Run the scraper:**

   ```sh
   npm run start
   ```

2. The scraped data will be saved in a file named `scraped_data_table.csv` in the root directory.

## Project Structure
