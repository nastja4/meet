import { render, within, waitFor } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import App from '../App';

describe('<EventList /> component', () => {  
  let EventListComponent;

  beforeEach(() => {
    EventListComponent = render(<EventList />);
  })
  // Feature 1: Filter Events By City
  // Scenario 1: Given the user hasn't searched for any city, 
  // When the user opens the app, 
  // Then the user should see a list of upcoming events from all cities.
  test('has an element with "list" role', () => {
    // const EventListComponent = render(<EventList />);
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={allEvents} />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });  
});


describe('<EventList /> integration', () => {
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector('#event-list');
    await waitFor(() => {                                     // waitFor() is useful if you need a way to query elements in the page that aren’t rendered immediately
      const EventListItems = within(EventListDOM).queryAllByRole('listitem'); // within() allows you to use React Testing Library query functions on the passed DOM object
      expect(EventListItems.length).toBe(32);
    });
  });
})