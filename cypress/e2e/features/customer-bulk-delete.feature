Feature:

  Background:
    Given user is authenticated
    And user has created 2 customers

  Scenario: User can delete customers in bulk
    When user goes to customers list view
    And selects 2 customers
    And performs bulk delete
    Then customers should not be visible in the customer list view