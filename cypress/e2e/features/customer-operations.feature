Feature: Customer Operations

  Background:
    Given user is authenticated
    And user has created a customer through API

  Scenario: User can delete a single customer
    When user goes to customers list view
    And clicks on the created customer
    And clicks delete customer
    Then customer should be deleted

  Scenario Outline: User can edit a customer in the customer list view
    When user goes to customers list view
    And edits the created customer values in the list view
    Then <operation> customer operation changes should be visible in the customer list view

    Examples:
      | operation |
      | edit      |

  Scenario Outline: User can edit a customer in the detailed view
    When user goes to customers list view
    And clicks on the created customer
    And clears <whole_form> in the customer form
    And fills every value in the <operation> customer form
    Then <operation> customer operation changes should be visible in the customer list view
    And customer should have correct values in the detailed view after <operation> operation

    Examples:
      | whole_form | operation |
      | false      | edit      |
