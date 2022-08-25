Feature:

  Background:
    Given user is authenticated

  Scenario: User can create a new customer
    When user navigates to customer creation page
    And fills every value in the customer form
    Then customer should be visible in the customer list view
    And customer should have correct values in the detailed view