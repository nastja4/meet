Feature: Show/Hide Event Details
  Scenario: Event details are collapsed by default
    Given an event is displayed in the event list
    When the user views the event
    Then the event details should be collapsed by default

  Scenario: User can expand an event to see details
    Given an event with collapsed details
    When the user clicks on the event to expand it
    Then the user should see the event details

  Scenario: User can collapse an event to hide details
    Given an event with expanded details
    When the user clicks on the event to collapse it
    Then the user should no longer see the event details
