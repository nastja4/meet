import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import App from '../App'; 
import userEvent from "@testing-library/user-event";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature'); 

defineFeature(feature, test => {
  // Feat 3, Scenario 1
  test('User has not specified the number of events to display', ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;

    given('the user has not specified the number of events to display', () => {});

    when('the user opens the app', async () => {
      AppComponent = render(<App />); // Render your App component
      // AppDOM = AppComponent.container.firstChild;
      // // Add any necessary code to simulate app opening
    });
    
    then('the user should see 32 events in the events list by default', async () => {
      AppDOM = AppComponent.container.firstChild;
      const inputElement = AppDOM.querySelector('#number-of-events input[type="text"]');
      expect(inputElement).toHaveValue('32');
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });    
    });
  });



  // Feat 3, Scenario 2
  test('User selects a different number of events to display', ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;

    given('the user is viewing a list of events', async () => {      
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });    
    });

    when('the user selects a different number of events to display (e.g., 10 events)', async () => {      
      const user = userEvent.setup();
      const inputElement = AppDOM.querySelector('#number-of-events input[type="text"]');
      await user.type(inputElement, '{backspace}{backspace}10');
      expect(inputElement).toHaveValue('10');      
    });

    then('the user should see the specified number of events in the events list', async () => {
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(10);
      });      
    });
  });
});
