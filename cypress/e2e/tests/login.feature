Feature: User can create a box and conduct a draw

  Scenario: User creates a box and conducts a draw
    Given the user navigates to the login page
    When the user logs in using the credentials of user 1
    And the user clicks on "Create a box"
    And the user enters the box name as "newBoxName"
    And the user selects an icon for the box
    And the user proceeds to gift settings
    And the user selects the gift price option
    And the user enters the maximum number of participants as "50"
    And the user selects the currency as "Euro"
    And the user completes the box creation
    Then the user sees the created box on the dashboard page
    And the header displays sections "Participants," "My Card," "Ward"

    When the user clicks "Send" to obtain the invitation link
    And the user clears cookies to simulate a new participant

    When the user follows the invitation link for participant 2
    And the user clicks "Send"
    And the user logs in with the credentials of user 2
    And the user sees the option to "Create a participant card"
    And the user clicks "Send"
    And the user proceeds to gift settings
    And the user enters wishes as "Wishes for user 2"
    And the user completes the participant card creation
    Then the user sees the notification "This is an anonymous chat with your Secret Santa"
    And the user clears cookies

    When the user follows the invitation link for participant 3
    And the user clicks "Send"
    And the user logs in with the credentials of user 3
    And the user sees the option to "Create a participant card"
    And the user clicks "Send"
    And the user proceeds to gift settings
    And the user enters wishes as "Wishes for user 3"
    And the user completes the participant card creation
    Then the user sees the notification "This is an anonymous chat with your Secret Santa"
    And the user clears cookies

    When the user follows the invitation link for participant 4
    And the user clicks "Send"
    And the user logs in with the credentials of user 4
    And the user sees the option to "Create a participant card"
    And the user clicks "Send"
    And the user proceeds to gift settings
    And the user enters wishes as "Wishes for user 4"
    And the user completes the participant card creation
    Then the user sees the notification "This is an anonymous chat with your Secret Santa"
    And the user clears cookies

    When the user logs in with the credentials of user 1
    And the user clicks "Start the draw"
    And the user goes to the boxes in the dashboard
    And the user clicks on the created box
    And the user clicks on "Start the draw"
    And the user confirms the draw
    And the user clicks "Continue"
    Then the user sees the notification of the draw completion
    And the user proceeds to the draw summary
    And the user clicks "Continue"
    And the user sees the notification "Notification sent to all participants"
    And the user clicks "Continue"
    And the user goes to the draw completion
    And the user clicks on "Return to the boxes"
    And the user clicks on "Gift"
    And the user confirms the gift
    And the user clicks "Continue"
    Then the user sees the notification "Gift confirmed"
    And the user completes the draw