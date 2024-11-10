# News Article Ordering Test

This project automates the testing of a news website to verify that articles displayed on the homepage are in the correct order based on their timestamps. The tests check that each article has the required attributes and that they are sorted in descending order by their publication date and time.

## Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)
- [Page Objects](#page-objects)
- [Configuration](#configuration)
- [Improvements](#improvements)
- [License](#license)

## Overview

This project uses [Playwright](https://playwright.dev/) to automate browser interactions and verify that:
- Each article on the homepage has a title and a timestamp.
- Articles are displayed in descending order by publication date and time (newest to oldest).

The code is structured into two main parts:
- **Tests**: Define and run test scenarios.
- **Page Object Model (POM)**: Encapsulates page-specific logic to streamline and modularize the code.

## Project Structure


- **`tests/homepage.spec.js`**: Contains test cases using Playwright to verify article order and attributes on the homepage.
- **`pages/HomePage.js`**: A Page Object Model (POM) for homepage interactions to encapsulate logic related to retrieving and processing article elements.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/news-article-ordering-test.git
   cd news-article-ordering-test

2. Install the dependencies:

   npm install


## Running Tests
### To run the tests on a specific browser (e.g., Chrome):
npx playwright test tests/index.spec.js --project=chromium

### To run tests across multiple browsers (Chrome, Firefox, and WebKit):
npx playwright test tests/index.spec.js

## Test Scenarios
1. Verify Required Elements
This test ensures that:

- Each article has a title.
- Each article has a timestamp.
- The configured number of articles to test (numberOfArticlesToTest) is a positive integer.
` test("Verify elements have required values", async () => { ... });`

2. Verify Article Order by Timestamp
This test verifies that articles are displayed in descending order based on their date and time, ensuring that the newest articles appear first.
`test("Verify articles are displayed in descending order by date and time", async () => { ... });`

##Page Objects
The HomePage.js file contains methods to interact with and retrieve information from the homepage:

- goToHomePage: Navigates to the homepage.
- getNumberOfArticlesToTest: Retrieves the configured number of articles to test.
- getArticleTitles: Returns an array of article titles.
- getDateAndTime: Returns an array of article timestamps in a human-readable format.
- setArticles: Loads and stores article titles and timestamps by clicking the "More" button if necessary.
- convertDateAndTimeToANumber: Converts timestamps to a numerical format for chronological comparison.
- Example Usage
- The HomePage class is instantiated in each test to interact with the homepage. Methods such as getArticleTitles, getDateAndTime, and - convertDateAndTimeToANumber help organize and validate the information displayed on the homepage.

### Configuration
The default number of articles to test is set to 100. This can be modified by adjusting the numberOfArticlesToTest variable in the HomePage class:
`this.numberOfArticlesToTest = 100; // Change to desired number`

## Improvements
Potential improvements for this project include:

- Parameterization: Make numberOfArticlesToTest configurable via environment variables or test inputs.
- Enhanced Error Messages: Customize error messages further for better clarity.
- Test Coverage: Extend tests to verify other attributes, such as the author or additional metadata.
- Browser Compatibility: Extend testing across multiple browsers by adjusting the Playwright configuration.
- License
This project is licensed under the MIT License.
