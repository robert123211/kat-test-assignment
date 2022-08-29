Feature: Customer creation

  Background:
    Given user is authenticated

  Scenario Outline: User can create a new customer
    When user navigates to customer creation page
    And fills every value in the <operation> customer form
    Then <operation> customer operation changes should be visible in the customer list view
    And customer should have correct values in the detailed view after <operation> operation

    Examples:
      | operation |
      | create    |