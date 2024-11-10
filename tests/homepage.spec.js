const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage.js");

let homePage;

// Setup function to initialize the browser, page, and navigate to the home page
test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  homePage = new HomePage(page); // Create an instance of HomePage with the opened page
  await homePage.goToHomePage(); // Navigate to the home page
  await homePage.setArticles();   // Load and store articles data
});

// Test to verify that all required elements (titles and timestamps) have valid values
test("Verify elements have required values", async () => {
  const articleTitles = await homePage.getArticleTitles(); // Retrieve list of article titles
  const dateAndTime = await homePage.getDateAndTime();     // Retrieve list of article timestamps
  const numberOfArticlesToTest = await homePage.getNumberOfArticlesToTest(); // Get count of articles to test

  // Verify each article title is present (not empty or null)
  articleTitles.forEach((title, index) =>
    expect(title, `Article ${index + 1} should have a title`).toBeTruthy()
  );

  // Verify each article timestamp is present (not empty or null)
  dateAndTime.forEach((date, index) =>
    expect(date, `Article ${index + 1} should have a date and time`).toBeTruthy()
  );

  // Verify that the number of articles to test is a positive integer
  expect(numberOfArticlesToTest, "numberOfArticlesToTest should be a positive integer")
    .toBeGreaterThan(0);
});

// Test to verify that articles are displayed in descending order by date and time
test("Verify articles are displayed in descending order by date and time", async () => {
  const articleTitles = await homePage.getArticleTitles(); // Retrieve list of article titles
  const dateAndTime = await homePage.getDateAndTime();     // Retrieve list of article timestamps
  const dateAndTimeConverted = await homePage.convertDateAndTimeToANumber(); // Convert timestamps to comparable format

  // Loop through each article and verify that each article's timestamp is >= the next article's timestamp
  for (let i = 0; i < dateAndTimeConverted.length - 1; i++) {
    const currentArticleTitle = articleTitles[i];     // Current article title
    const nextArticleTitle = articleTitles[i + 1];    // Next article title
    const errorMessage = `Expected article ${i + 1} ("${currentArticleTitle}", ${dateAndTime[i]}) to be newer than or equal to article ${i + 2} ("${nextArticleTitle}", ${dateAndTime[i + 1]}).\n\nNote: Articles are frequently updated, so use titles for identification, and timestamps are located in the [class="age" title="YYYY-MM-DDTHH:MM:SS"] attribute.`;

    // Assert that each article's timestamp is newer than or equal to the next article's timestamp
    expect(dateAndTimeConverted[i], errorMessage).toBeGreaterThanOrEqual(dateAndTimeConverted[i + 1]);
  }
});
