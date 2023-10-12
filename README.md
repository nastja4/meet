# Meet App 

Meet App is a serverless, progressive web application (PWA) built with React, following a test-driven development (TDD) approach. The app utilizes the Google Calendar API to fetch upcoming events and offers various features for users to explore and manage events.

App icon:

![app icon](https://github.com/nastja4/meet/assets/126527606/d6ac4a62-aecb-4476-a66c-a4f6b2d4b8fa)

Screnshots:
![Screenshot N1](https://github.com/nastja4/meet/assets/126527606/a5f89bb5-0bae-4c88-bc84-025df6c5ee80)
![Screenshot N2](https://github.com/nastja4/meet/assets/126527606/324cea32-1ddc-40fd-af80-55bbe802a718)

## Table of Contents

- [Features](#features)
- [User Stories](#user-stories)
- [Scenarios](#scenarios)
- [Serverless Functions](#serverless-functions)
- [Technical Requirements](#technical-requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Filter events by city.
- Show/hide event details.
- Specify the number of events to display.
- Offline support.
- Add an app shortcut to the home screen.
- Display charts visualizing event details.

## User Stories

- As a user, I would like to be able to filter events by city so that I can see the list of events that take place in that city.
- As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.
- As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.
- As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.
- As a user, I would like to be able to add the app shortcut to my home screen so that I can open the app faster.
- As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.

## Scenarios

### Feature 1: Filter Events By City

**Scenario 1:**
- Given the user hasn't searched for any city,
- When the user opens the app,
- Then the user should see a list of upcoming events from all cities.

**Scenario 2:**
- Given the main page is open,
- When the user starts typing in the city textbox,
- Then the user should receive a list of cities (suggestions) that match what they've typed.

**Scenario 3:**
- Given the user was typing "Berlin" in the city textbox
- AND the list of suggested cities is showing,
- When the user selects a city (e.g., "Berlin, Germany") from the list,
- Then their city should be changed to that city (i.e., "Berlin, Germany")
- AND the user should receive a list of upcoming events in that city.

### Feature 2: Show/Hide Event Details

**Scenario 1:**
- Given an event is displayed in the event list,
- When the user views the event,
- Then the event details should be collapsed by default.

**Scenario 2:**
- Given an event with collapsed details,
- When the user clicks on the event to expand it,
- Then the user should see the event details.

**Scenario 3:**
- Given an event with expanded details,
- When the user clicks on the event to collapse it,
- Then the user should no longer see the event details.

### Feature 3: Specify Number of Events

**Scenario 1:**
- Given the user has not specified the number of events to display,
- When the user opens the app,
- Then the user should see 32 events in the events list by default.

**Scenario 2:**
- Given the user is viewing a list of events,
- When the user selects a different number of events to display (e.g., 10 events),
- Then the user should see the specified number of events in the events list.

### Feature 4: Use the App When Offline

**Scenario 1:**
- Given the user is using the app with no internet connection,
- When the user tries to access event data,
- Then the app should display cached data from the user's last online session.

**Scenario 2:**
- Given the user is using the app with no internet connection,
- When the user attempts to change search settings (e.g., city or number of events),
- Then the app should display an error message indicating that changes cannot be made offline.

### Feature 5: Add an App Shortcut to the Home Screen

**Scenario 1:**
- Given the user is using the app on a mobile device,
- When the user chooses to add the app to their home screen,
- Then the app should be installed as a shortcut on the user's device home screen.

### Feature 6: Display Charts Visualizing Event Details

**Scenario 1:**
- Given the user wants to view event statistics,
- When the user navigates to the event statistics section,
- Then the app should display a chart showing the number of upcoming events in each city.

## Serverless Functions

Meet App utilizes serverless functions to efficiently handle various backend tasks. These functions play a crucial role in performing tasks such as user authentication and fetching event data from the Google Calendar API.

### Benefits of Serverless Functions

- **Simplified Backend**: Our adoption of serverless architecture eliminates the need for traditional backend servers, leading to reduced complexity and minimal maintenance overhead.

- **Scalability**: Serverless functions automatically scale based on user demand, ensuring that the app remains responsive even during traffic spikes.

- **Cost-Effectiveness**: With serverless computing, we only incur costs for the actual compute time utilized. This cost-effective model is particularly advantageous for apps with varying usage patterns.

- **High Availability**: Serverless functions are designed for high availability, guaranteeing that our app remains accessible 24/7.

These serverless functions are indispensable to the seamless operation of Meet App, providing essential backend functionality while allowing us to concentrate on delivering an exceptional user experience.

## Technical Requirements

- React application.
- TDD development approach.
- Google Calendar API and OAuth2 authentication.
- Serverless functions (AWS Lambda preferred) for the authorization server.
- GitHub repository for code hosting.
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge, Opera, IE11).
- Responsive design for various screen sizes.
- Lighthouse's PWA checklist compliance.
- Offline support using a service worker.
- App installation on desktop and mobile home screen.
- Deployment on GitHub Pages.
- Alert system using an OOP approach.
- Data visualization with charts.
- Test coverage >= 90%.
- Online performance monitoring tool integration.

## Installation

The Meet App was created using a tool create-react-app (or “CRA”):
```
npx create-react-app meet --template cra-template-pwa --use-npm
```
This command created the project structure within a new “meet” folder.

After running these commands, you should be able to navigate to your app in the browser:
```
cd meet
npm run start
```

This is followed by adding gh-pages to the project’s dev dependencies:
```
npm install --save-dev gh-pages
```
and creating a new GitHub repository with the name "meet".

## Usage

1. Launch the application.
2. Log in into the Google account and grant consent for the app to access and view calendar events retrieved through the Google Calendar API.
3. Explore the different sections of the application, such as the input box for choosing the city you're interested in, the option to select the number of events to be displayed in a list, and data visualization.

## Testing

### Unit and Integration Tests with React Testing Library

We use a testing utility specifically designed for testing React components - React Testing Library - for creating unit and integration tests for our project and a JavaScript testing framework. These tests help ensure that individual components and their interactions work as expected. You can find the test files in the `__tests__` directory.
You can run your test by inputting the following command in your terminal:
```
npm run test
```

### Acceptance Tests with Cucumber and Jest

We've implemented acceptance tests using the Cucumber framework, which is integrated with Jest. These tests are written using Gherkin's "Given, When, Then" syntax, making it easy to describe and validate the expected behavior of our application.

### End-to-End Tests with Puppeteer

End-to-end tests are conducted using Puppeteer. This tool allows us to simulate user interactions within the browser to ensure that our app's user interface functions correctly.

### Continuous Integration and Continuous Delivery (CI/CD)

We've integrated continuous integration and continuous delivery practices into our development process. This helps us ensure that changes to the codebase are continually integrated, tested, and deployed, reducing the risk of introducing bugs or issues.

### App Performance Monitoring

App performance is crucial, and we use Atatus, an Application Performance Management (APM) tool, to monitor the performance and detect errors in our Meet app. This ensures that our app is running smoothly and efficiently.

## Deployment

The app is deployed on GitHub Pages.

## Contributing

Contributions to this project are welcome. To contribute, follow these steps:

1. Fork the project.
2. Create a new branch for your feature: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add a new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request for review.

## License
