Feature: User login on secret santa website

    Scenario: User logs in successfully
        Given user is on secret santa login page
        When user logs in as "<login>" and "<password>"
        Then user is on dashboard page
        Examples:
            | login                       | password |
            | angela.pikulina+3@gmail.com | test1111 |
            
           
    Scenario: User logs in successfully
        Given user is on secret santa login page
        When user logs in as "<login>" and "<password>"
        Then user is on dashboard page
        Examples:
            | login                       | password |
            | angela.pikulina+4@gmail.com | test1111 |
            