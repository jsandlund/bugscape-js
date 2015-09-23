<!-- 1. Set up game states: createGame, playGame, endGame -->
  <!-- - state_createGame
    - show createGame card
    - Input username
    - Select difficulty
  - state_playGame
    - hide createGame card
    - start game engine
      - scoring of points
      - collission events
      - lives -->
      <!-- - timer
        - refactor timer into prototype
        - game should end when time is up OR lives = 0 -->
  <!-- - state_endGame
    - stop game engine
    - hide playGame state
    - show end game modal -->

<!-- 2. Set up leaderboard
  - Design data model for saving scores and names by difficulty level -->


- Set up firebase
   - - http://time2hack.com/2015/03/intro-to-firebase-with-javascript-and-jquery.html
    - https://www.codecademy.com/en/tracks/firebase
    - https://www.airpair.com/firebase/posts/firebase-building-realtime-app
    - http://thejackalofjavascript.com/getting-started-with-firebase/
    - https://www.firebase.com/tutorial/#session/f5ivinhiynt  
  <!-- - Save records to firebase DB on game end -->
  - Remove old database structure
  - Get records and update leaderboard on game end  
    - Get records
    - Rank records by difficulty && score
    - Write to HTML
    - Set up authentication

  - On game load
    - Get scores from firebase, add to local container array
  - On game end
    - add new score to firebase
    - then, add new score to local container array
    - then, sort local container array
    - then, write to HTML



- Finish setting up game difficulty variables
  - Set up superbug attributes

- Add game instructions

- CSS CSS CSS. Make this baby look sexy!
  - New header font
  - Background color

- Code review. Clean up loose ends.  

- Submit.
