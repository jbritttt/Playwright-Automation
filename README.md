# Getting familiar with testing using playwright

## Requirements?
To validate that every article is ranked correctly on the page from the newest to the oldest.

## How test no: 2 works?

It works by exstracting each article time-stamp from the title attribute and removeing chars that are not a number, after removing these chars we are left with a 14 digit number. The number for the latest article posted should have the greatest value. I can make assertions based on this and validate that each post is ranked correctly in order of the newest to the oldest.  


1. Extract attribute value of date and time from each element `[title="2024-07-26T19:56:27"]`  and store in an array 

["2024-07-26T19:56:27","2024-07-26T19:56:20","2024-07-26T19:56:10","2024-07-26T19:56:00"]


2. Remove the chars from each item in array that isnt a number 

["20240726195627","20240726T195620","20240726195610","20240726195600"]


3. Convert each item in array from a string to a number

`[20240726195627, 20240726T195620, 20240726195610, 20240726195600]`


4. Loop through array and assert that each item is greater than every other item after its index.

`expect(index[0]).toBeGreaterThan(index[1])`



## Commands to run tests

### To run only on chrome
npx playwright test tests/index.spec.js --project=chromium

### To run on chrome, firefox and webkit
npx playwright test tests/index.spec.js



### Wins
- I managed to come up with a simple solution with very minimal code thats easy to understand and is maintainable.
- The number of articles that are being tested can be easily changed because dynamic values are being used throughout the programm 
- If other elements need tested in the future then functionality for this can be easily implemented



### Struggles
I didnt realise how often the page was updated and as a result I couldnt locate the articles that failed the test by rank number when inspecting the UI






