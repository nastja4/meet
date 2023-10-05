import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow down by 250ms,
      timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  // Feat 2, Scenario 1
  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .eventDetails');
    expect(eventDetails).toBeNull();
  });

  // Feat 2, Scenario 2
  test('User can expand an event to see details', async () => {
    await page.click('.event .eventDetails-btn');
    const eventDetails = await page.$('.event .eventDetails');
    expect(eventDetails).toBeDefined();
  });

  // Feat 2, Scenario 3
  test('User can collapse an event to hide details', async () => {
    await page.click('.event .eventDetails-btn');
    const eventDetails = await page.$('.event .eventDetails');
    expect(eventDetails).toBeNull();
  });
});



describe('Filter events by city', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // Set to true for headless mode
      slowMo: 250, // Slow down by 250ms for better visibility (optional)
      timeout: 0, // Removes any Puppeteer/browser timeout limitations
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/'); // Update the URL to your app's URL
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  // Feat 1, Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
  test('Show upcoming events from all cities when no city is searched', async () => {
    const eventListItems = await page.$$('.event');
    expect(eventListItems.length).toBe(32); // Ensure events are displayed
  });

  // Feat 1, Scenario 2: User should see a list of suggestions when they search for a city.
  test('Display suggestions when the user starts typing in the city textbox', async () => {
    await page.type('.city', 'Berlin'); 
    await page.waitForSelector('.suggestions li');
    const suggestionListItems = await page.$$('.suggestions li');
    expect(suggestionListItems.length).toBe(2); 
  });

  // Feat 1, Scenario 3: User can select a city from the suggested list.
  test('Selecting a city from the suggestion list should update the city field and show events in that city', async () => {    
    // page.$ selects the first matching element in the page
    const suggestionListItem = await page.$('.suggestions li');
    // DOM element (el) that matches the specified selector  
    const cityName = await page.evaluate(el => el.textContent, suggestionListItem);
    await suggestionListItem.click();

    // waiting for events to be updated based on the selected city
    await page.waitForSelector('.event');
    const eventListItems = await page.$$('.event');

    // to make sure the city field is updated and events are displayed for the selected city
    const selectedCity = await page.$eval('.city', el => el.value);
    expect(selectedCity).toBe(cityName);
    expect(eventListItems.length).toBe(17); 
  });
});
