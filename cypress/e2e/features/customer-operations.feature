Feature:

  Background:
    Given user is authenticated
    And user has created a customer through API

  Scenario: User can delete a single customer
    When user goes to customers list view
    And clicks on the created customer
    And clicks delete customer
    Then customer should be deleted
#
#  Scenario: User can edit a customer in the detailed view
#  Scenario: User can edit a customer in the customer list view
