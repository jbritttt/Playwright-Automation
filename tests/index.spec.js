

/******* See ReadMe to read a descrition on how the program works, commands and possible improvments etc.. ********/

const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/index.js");


let homePage;

 
    test.beforeAll( async ({browser,}) => {

      const page = await browser.newPage()
      homePage = new HomePage(page);
      await homePage.goToHomePage();
      await homePage.setArticles();
  
    })
 
    
    //test: 1
    test("Test that elements have required values for test no: 2", async () => {

    const articleTitles = await homePage.getArticleTitles();
    const dateAndTime = await homePage.getDateAndTime();
    const numberOfArticlesToTest = await homePage.getNumberOfArticlesToTest();
    
   articleTitles.forEach((currentValue, index) => expect(currentValue, `Article ${index + 1} to have a title`).toBeTruthy())
    dateAndTime.forEach((currentValue, index) => expect(currentValue, `Article ${index + 1} to have a value`).toBeTruthy())
    expect(numberOfArticlesToTest, 'Variable numberOfArticlesToTest value must be an integer greater than 0').toBeTruthy() 
   
    })



    //test: 2
    test("Test that articles are displayed in correct order of the most recent by their date and time", async () => {
    
    // Invoke functions/methods from POM
    const articleTitles = await homePage.getArticleTitles();
    const numberOfArticlesToTest = await homePage.getNumberOfArticlesToTest();
    const dateAndTime = await homePage.getDateAndTime();
    const dateAndTimeConverted = await homePage.convertDateAndTimeToANumber();

    let loopCycleCount = 0
    
    async function testOrderOfElements() {

      //loop to compare each articles Time/Date with every other article below it's current position in the array
      dateAndTimeConverted.forEach((currentValue, index) => {      
        
              //begin loop                  //end of loop cycle              // looping complete break from loop
        if(index > loopCycleCount && index !== numberOfArticlesToTest && loopCycleCount !== numberOfArticlesToTest){

          let errorMessage = `expected article ${loopCycleCount + 1}. "${articleTitles[loopCycleCount]}" ${dateAndTime[loopCycleCount]} \nto be newer than article ${index + 1}. "${articleTitles[index]}" ${dateAndTime[index]}\n\nPlease note: that article rank numbers may have changed since running the test as the web page is updated frequently.\n So, locate the articles in question by their respective article title as shown above, and use the rank/article\n position numbers only as a guide when manually inspecting the UI!\n\n ** Article posted time-stamp is located on the elements attribute e.g.[class="age" title="2024-07-26T19:56:27"] **`;

          //toBeGreaterThanOrEqual() is used because sometimes multiple articles are posted at the exact same time precise to the second.
          expect(dateAndTimeConverted[loopCycleCount],errorMessage).toBeGreaterThanOrEqual(currentValue) 

        }
            //calls testOrderOfElements() again to begin the next loop cycle
         if(index == numberOfArticlesToTest - 1 && loopCycleCount < numberOfArticlesToTest - 1){
            loopCycleCount = loopCycleCount + 1
            console.log(index, `Iteration count: is index ${numberOfArticlesToTest - 1} before starting new cycle`)
            console.log(loopCycleCount, `Cycle count: testing that index ${loopCycleCount} is greater than every other item in array\n`)
            testOrderOfElements()
          }
      });
    }

      await testOrderOfElements();
  });
 
 
