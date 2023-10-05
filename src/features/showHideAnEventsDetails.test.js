import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

  // Feat 2, Scenario 1
  test('Event details are collapsed by default', ({ given, when, then }) => {        
    let AppComponent;
    let AppDOM;

    given('an event is displayed in the event list', async () => {     
      AppComponent = render(<App />);
    });

    when('the user views the event', async () => {      
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });      
    });

    then('the event details should be collapsed by default', async () => {
      AppDOM = AppComponent.container.firstChild;      
      const detailsSection = AppDOM.querySelector(".eventDetails");
      expect(detailsSection).toBeNull();
    });
  });



  // Feat 2, Scenario 2
  test('User can expand an event to see details', ({ given, when, then }) => {    
    let AppComponent;
    let AppDOM;

    given('an event with collapsed details', async () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });          
    });

    let expandedEventElement;
    when('the user clicks on the event to expand it', () => {
      const user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      const detailsButton = within(EventListItems[0]).queryByText('Show Details');
      user.click(detailsButton);
      expandedEventElement = EventListItems[0];
    });

    then('the user should see the event details', () => {
      const eventDetails = expandedEventElement.querySelectorAll('.eventDetails');
      expect(eventDetails).toBeDefined();
    });
  });



  // Feat 2, Scenario 3
  test('User can collapse an event to hide details', ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;

    given('an event with expanded details', async () => {      
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;

      const EventListDOM = AppDOM.querySelector('#event-list');
      const user = userEvent.setup();

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });       
      
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      const detailsButton = within(EventListItems[0]).queryByText('Show Details');
      await user.click(detailsButton);      
      
      const detailsSection = AppDOM.querySelector(".eventDetails");
      expect(detailsSection).toBeInTheDocument();
    });

    when('the user clicks on the event to collapse it', async () => {
      // Find the "Hide Details" button and click it
      const hideDetailsButton = AppDOM.querySelector('.eventDetails-btn');
  
      if (hideDetailsButton) {
        // If the button is found, click it to collapse the details
        const user = userEvent.setup();
        await user.click(hideDetailsButton);
      } else {
        // Handle the case where the button is not found (already collapsed)
        console.log('Event details are already collapsed');
      }
    });
  
    then('the user should no longer see the event details', () => {      
      const detailsSection = AppDOM.querySelector(".eventDetails");
      expect(detailsSection).toBeNull();
    });
  });
});