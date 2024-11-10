export class HomePage {
  constructor(page) {
    this.page = page;
    this.logoText = page.locator(".hnname");                         // Locator for the logo which is the text "Hacker News"
    this.buttonMore = page.locator(".morelink");                 // Locator for the "More" button to load additional articles
    this.articleTitlesLocator = page.locator(".titleline");      // Locator for article titles
    this.articleDateAndTimeLocator = page.locator(".age");       // Locator for article date and time

    this.articleTitles = [];                                     // Array to store article titles
    this.articleDateAndTime = [];                                // Array to store article date and time values
    this.numberOfArticlesToTest = 100;                           // Configurable number of articles to test
  }

  // Navigate to the home page of the website
  async goToHomePage() {
    await this.page.goto("https://news.ycombinator.com/newest");
  }

// Retrieve the logo text
async getLogoText() {
  return this.logoText.textContent();
}

  // Retrieve the configured number of articles to test
  async getNumberOfArticlesToTest() {
    return this.numberOfArticlesToTest;
  }

  // Retrieve a subset of article titles up to the configured number of articles to test
  async getArticleTitles() {
    return this.articleTitles.slice(0, this.numberOfArticlesToTest);
  }

  // Retrieve a subset of article date and time values up to the configured number of articles to test,
  // replacing "T" with a space for improved readability
  async getDateAndTime() {
    return this.articleDateAndTime
      .slice(0, this.numberOfArticlesToTest)
      .map(date => date.replaceAll("T", "  "));
      
  }

  // Populate article titles and date/time arrays by querying elements on the page.
  // If the number of articles retrieved is less than the desired number, click the "More" button to load additional articles
  async setArticles() {
    const titles = await this.articleTitlesLocator.all();          // Get all article title elements
    const dates = await this.articleDateAndTimeLocator.all();      // Get all date and time elements

    // Extract and store the text content of each title
    for (const title of titles) {
      this.articleTitles.push(await title.textContent());
    }

    // Extract and store the 'title' attribute (timestamp) of each date element
    for (const dateElement of dates) {
      this.articleDateAndTime.push(await dateElement.getAttribute("title"));
    }

    // If fewer articles were retrieved than the configured number, load more articles by clicking "More"
    if (this.articleDateAndTime.length < this.numberOfArticlesToTest) {
      await this.buttonMore.click();
      await this.setArticles();   // Recursively call setArticles until enough articles are retrieved
    }
  }

  // Convert each date and time string in the array to a numeric format by removing non-numeric characters
  // This allows for easier chronological comparisons in tests
  async getDateAndTimeUnixEpoch() {
    
    return this.articleDateAndTime.slice(0, this.numberOfArticlesToTest)
      .map(date => Number(date.slice(20)));  // Extract UNIX epoch which is the equivalent of the date and time
      
  }

  
}
