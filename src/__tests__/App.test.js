import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
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

  // Feature 3: Specify Number of Events
  // Scenario 1: Given the user has not specified the number of events to display,
  // When the user opens the app,
  // Then the user should see 32 events in the events list by default.
  test('the NumberOfEvents component is rendered correctly', () => {
    expect(AppDOM.querySelector('#eventCount-input')).toBeInTheDocument();
  });
});


describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');   

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);


    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });
})



