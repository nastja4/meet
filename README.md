# Meet App

## Objective

Meet App is a serverless, progressive web application (PWA) built with React, following a test-driven development (TDD) approach. The app utilizes the Google Calendar API to fetch upcoming events and offers various features for users to explore and manage events.

## Table of Contents

- [Features](#features)
- [User Stories](#user-stories)
- [Scenarios](#scenarios)
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
- Given the user was typing "Berlin" in the city textbox AND the list of suggested cities is showing,
- When the user selects a city (e.g., "Berlin, Germany") from the list,
- Then their city should be changed to that city (i.e., "Berlin, Germany") AND the user should receive a list of upcoming events in that city.

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


