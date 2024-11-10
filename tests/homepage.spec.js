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




// Test to verify that the logo text is "Hacker News"
test("Verify logo text is equal to 'Hacker News'", async () => {
  const logoText = await homePage.getLogoText()
  
  expect(logoText, `Expected ${logoText} to be "Hacker News"`).toBe("Hacker News");
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
  const dateAndTimeConverted = await homePage.getDateAndTimeUnixEpoch(); // Convert timestamps to comparable format

  // Loop through each article and verify that each article's timestamp is >= the next article's timestamp
  for (let i = 0; i < dateAndTimeConverted.length - 1; i++) {
    const currentArticleTitle = articleTitles[i];     // Current article title
    const nextArticleTitle = articleTitles[i + 1];    // Next article title
    const errorMessage = `Expected article ${i + 1} ("${currentArticleTitle}", ${dateAndTime[i]}) to be newer than or equal to article ${i + 2} ("${nextArticleTitle}", ${dateAndTime[i + 1]}).\n\nNote: Articles are frequently updated, so use titles for identification, and timestamps are located in the [class="age" title="YYYY-MM-DDTHH:MM:SS"] attribute.`;

    // Assert that each article's timestamp is newer than or equal to the next article's timestamp
    expect(dateAndTimeConverted[i], errorMessage).toBeGreaterThanOrEqual(dateAndTimeConverted[i + 1]);
  }
});

// New test to verify exact number of articles is loaded
test("Verify exact number of articles is loaded", async () => {
  const articleTitles = await homePage.getArticleTitles();
  const numberOfArticlesToTest = await homePage.getNumberOfArticlesToTest();
  expect(articleTitles.length, `Expected exactly ${numberOfArticlesToTest} articles, but got ${articleTitles.length}`).toBe(numberOfArticlesToTest);
});

// New test to verify article titles are unique
test("Verify article titles are unique", async () => {
  const articleTitles = await homePage.getArticleTitles();
  const titleSet = new Set(articleTitles);
  expect(titleSet.size, "Duplicate article titles found").toBe(articleTitles.length);

  articleTitles.forEach((title, index) => {
    if (articleTitles.indexOf(title) !== index) {
      throw new Error(`Duplicate title found: "${title}" at article index ${index + 1}`);
    }
  });
});

// New test to verify article dates are in the past
test("Verify article dates are in the past", async () => {
  const dateAndTimeConverted = await homePage.getDateAndTimeUnixEpoch();
  const currentDate = Date.now()
  console.log('current date (UNIX epoch)', currentDate)
  console.log('article 1 date extracted (UNIX epoch)', dateAndTimeConverted[0])
  //currentDate.replace(/\D/g, "")
  dateAndTimeConverted.forEach((date, index) => {
    expect(date, `Article ${index + 1} has a future date: ${date}`).toBeLessThan(currentDate);
  });
});

// New test to verify "More" button is visible when more articles are available
test("Verify 'More' button is visible when more articles are available", async () => {
  const isMoreButtonVisible = await homePage.buttonMore.isVisible();
  expect(isMoreButtonVisible, "'More' button should be visible when more articles are available").toBeTruthy();
});

// New test to verify each article title has a clickable link
test("Verify each article title has a clickable link", async () => {
  // Locate all article title containers
  const titleContainers = await homePage.articleTitlesLocator.all();

  for (let i = 0; i < titleContainers.length; i++) {
    // Locate the first anchor tag within each title container
    const firstAnchor = await titleContainers[i].locator('a').first();
    const href = await firstAnchor.getAttribute("href");

    // Assert that the first anchor has a valid href attribute
    expect(href, `Article ${i + 1} title is missing a clickable link in the first anchor`).toBeTruthy();
  }
});
