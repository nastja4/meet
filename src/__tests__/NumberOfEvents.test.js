import { render } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import userEvent from "@testing-library/user-event";

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;

  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => { }} />); // manually passing a dummy setCurrentNOE function prop to the .render() call of that unit test
  });

  // Feature 3: Specify Number of Events
  test('has an element with "textbox" role', () => {
    const inputElement = NumberOfEventsComponent.getByRole('textbox'); // Find the textbox element
    expect(inputElement).toBeInTheDocument(); // Assert that the textbox element is in the document
  });

  test('the default value of the input field is 32', () => {
    const inputElement = NumberOfEventsComponent.getByRole('textbox');
    expect(inputElement).toHaveValue('32');
  });

  test('the value of the input field changes when the user types', async () => {
    const inputElement = NumberOfEventsComponent.getByRole('textbox');
    const user = userEvent.setup();
    await user.type(inputElement, '{backspace}{backspace}10');
    expect(inputElement).toHaveValue('10');
  })
});


