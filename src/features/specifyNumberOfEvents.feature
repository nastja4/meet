Feature: Specify Number of Events
  Scenario: User has not specified the number of events to display
    Given the user has not specified the number of events to display
    When the user opens the app
    Then the user should see 32 events in the events list by default

  Scenario: User selects a different number of events to display
    Given the user is viewing a list of events
    When the user selects a different number of events to display (e.g., 10 events)
    Then the user should see the specified number of events in the events list
