import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // This library is typically used in combination with React Testing Library (RTL) to simulate user interactions with your React components when writing tests
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';
import App from '../App';


describe('<CitySearch /> component', () => {  
  let CitySearchComponent;

  beforeEach(() => {
    //  adding a dummy prop allLocations={[]} to evoid unit test error
    CitySearchComponent = render(<CitySearch 
        allLocations={[]} 
        // setCurrentCity={() => { }}
        setInfoAlert={() => { }}
      />);
  });

  // Feature 1: Filter Events By City
  // Scenario 2: Given the main page is open, 
  // When the user starts typing in the city textbox, 
  // Then the user should receive a list of cities (suggestions) that match what they've typed.
  test('renders text input', () => {
    // const CitySearchComponent = render(<CitySearch />);
    const CityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(CityTextBox).toBeInTheDocument();
    expect(CityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    // const CitySearchComponent = render(<CitySearch />);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    // const CitySearchComponent = render(<CitySearch />);
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    // ensures that the suggestion list appears when the city input field “gains focus” (i.e., when the input field is clicked)
    await user.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} setInfoAlert={() => { }} />);

    // user types "Berlin" in city textbox
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    // filter allLocations to locations matching "Berlin"
    const suggestions = allLocations? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }): [];

    // get all <li> elements inside the suggestion list
    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  // Feat 1: Filter Events By City
  // Scenario 3: Given the user was typing "Berlin" in the city textbox AND the list of suggested cities is showing,
  // When the user selects a city (e.g., "Berlin, Germany") from the list,
  // Then their city should be changed to that city (i.e., "Berlin, Germany") AND the user should receive a list of upcoming events in that city.
  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents(); 
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} setCurrentCity={() => { }} setInfoAlert={() => { }} />);

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    // the suggestion's textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];
    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});


describe('<CitySearch /> integration', () => {
  test('renders suggestions list when the app is rendered', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox'); //  React Testing Library function, within(), allows you to use React Testing Library query functions on the passed DOM object
    await user.click(cityTextBox); // await user.click() or await user.type() functions (the UI update is related to a userEvent interaction) will automatically wait for the DOM to be updated

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); // func .queryAllByRole('listitem') is used to select all elements that have a specific ARIA (Accessible Rich Internet Applications) role of "listitem" within the rendered component
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });
});