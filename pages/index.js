
/******* See ReadMe to read a descrition on how the program works, commands and possible improvments etc.. ********/

let articleDateAndTime = [];
let articleTitles = [];
let articleAge = []

// This value is dynamic throughout the program. You can simply change this number to test more or less than 100 articles.
let numberOfArticlesToTest = 100

export class HomePage {

  // Get elements from the DOM

  constructor(page) {
    this.page = page;
    this.buttonMore = page.locator(".morelink");
    this.articleTitle = page.locator(".titleline");
    this.dateAndTime = page.locator(".age");
    //this.row = page.locator("tr");
  }


  //Function to navigate to home page

  async goToHomePage() {

    await this.page.goto("https://news.ycombinator.com/newest");

  }
  

  //Function that gets the number of articles we are testing

  async getNumberOfArticlesToTest() {
    
    return numberOfArticlesToTest

  }


  //function that returns the title of each article

  async getArticleTitles() {

    let result = articleTitles.slice(0, numberOfArticlesToTest);
    return result;

  }


  //Function that returns an array of the date and time that each article was posted

  async getDateAndTime() {

    let newArr = articleDateAndTime.slice(0, numberOfArticlesToTest);
    //Makes time-stamp more readable on failed test error message. char.replaceAll("T", "  ")
    const result = newArr.map((char) => char.replaceAll("T", "  "));
    return result;

  }


  //Function that loops articles and stores article date/time and titles 

  async setArticles() {

    for (const title of await this.articleTitle.all())
      articleTitles.push(await title.textContent());

    for (const dateAndTime of await this.dateAndTime.all())
      articleDateAndTime.push(await dateAndTime.getAttribute("title"));

  
    if (articleDateAndTime.length < numberOfArticlesToTest) {
      await this.buttonMore.click();
      await this.setArticles();
      }

      console.log(articleAge)
  }


  //Function that removes charactors from date/time and converts to number. e.g. converts from "2024-07-26T19:40:15" to 20240726T194015

  async convertDateAndTimeToANumber() {

    let newArr = articleDateAndTime.slice(0, numberOfArticlesToTest);

    let result = newArr.map((char) => Number(char.replace(/\D/g, '')));

    console.log(result);
    
    console.log(`"EXACTLY" the first ${result.length} articles date & time: ${result.length}\n`);

    if(result.length){
      return result;
    }
    

  }
}
