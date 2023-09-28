import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {
  let AppDOM;

  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  })
  // Feature 1: Filter Events By City
  // Scenario 1: Given the user hasn't searched for any city, 
  // When the user opens the app, 
  // Then the user should see a list of upcoming events from all cities.
  test('renders list of events', () => {
    // const AppDOM = render(<App />).container.firstChild;
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });


  // Feat 1: Filter Events By City
  // Scenario 2: Given the main page is open, 
  // When the user starts typing in the city textbox, 
  // Then the user should receive a list of cities (suggestions) that match what they've typed.
  test('render CitySearch', () => {
    // const AppDOM = render(<App />).container.firstChild;
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    });



});




