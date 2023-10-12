import Event from "../components/Event";
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import mockData from "../mock-data";
import { getEvents } from '../api';

// const mockEvent = mockData[0]; // using a specific event from mockData for testing

describe('<Event /> component', () => {
  let EventComponent;
  let allEvents; // Declare allEvents variable    

  beforeEach(async () => {
    allEvents = await getEvents(); // Fetch events before each test
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  // Feature 2: Show/Hide Event Details
  // Scenario 1: Given an event is displayed in the event list,
  // When the user views the event,
  // Then the event details should be collapsed by default.
  test('renders event`s title, event details should be collapsed by default', () => {
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  }); 

  test('renders event`s location', () => {
    expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
  });

  test('renders event details btn with the title (Show Details)', () => {
    expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
  });

  test('by default, event`s details section should be hidden', () => {
    const detailsSection = EventComponent.container.querySelector(".eventDetails");
    expect(detailsSection).toBeNull();
  });

  test('shows the details section when the user clicks on the `Show Details` btn', async () => {
    const user = userEvent.setup();
    await user.click(EventComponent.getByText("Show Details"));

    expect(EventComponent.container.querySelector(".eventDetails")).toBeInTheDocument();
    expect(EventComponent.queryByText('Show Details')).toBeNull();
    expect(EventComponent.queryByText('Hide Details')).toBeInTheDocument();
  });

  test('hides the details section when the user clicks on the `Hide Details` btn', async () => {
    const user = userEvent.setup();
    await user.click(EventComponent.getByText("Show Details"));
    await user.click(EventComponent.getByText("Hide Details"));

    expect(EventComponent.container.querySelector(".eventDetails")).toBeNull();
    expect(EventComponent.getByText("Show Details")).toBeInTheDocument();
  });
});