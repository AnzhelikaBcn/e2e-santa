Feature: User login on secret santa website

    Scenario: User logs in successfully
        Given user is on secret santa login page
        When user logs in as "angela.pikulina+1@gmail.com" and "test1111"
        Then user is on dashboard page
        Examples:
            | login                       | password |
            | angela.pikulina+1@gmail.com | test1111 |
            
           
    Scenario: User logs in successfully
        Given user is on secret santa login page
        When user logs in as "angela.pikulina+1@gmail.com" and "test1111"
        Then user is on dashboard page
        Examples:
            | login                       | password |
            | angela.pikulina+1@gmail.com | test1111 |
            