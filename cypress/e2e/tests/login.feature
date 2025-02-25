Feature: User login on secret santa website

    Scenario: User logs in sucessfully
        Given user is on secret santa login page
        When user logs in as "angela.pikulina+1@gmail.com" and "test1111"
        #When user logs in with table
        #| login     | password |
        #| angela.pikulina+1@gmail.com     | test1111 |

        Then user is on dashboard page
        Examples:
            | login                       | password |
            | angela.pikulina+1@gmail.com | test1111 |
            | angela.pikulina+2@gmail.com | test1111 |
            | angela.pikulina+3@gmail.com | test1111 |
            | angela.pikulina+4@gmail.com | test1111 |




