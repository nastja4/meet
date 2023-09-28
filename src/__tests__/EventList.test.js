import { render } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

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