1. Set up game states: createGame, playGame, endGame
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
      - timer
        - game should end when time is up OR lives = 0
  - state_endGame
    - stop game engine
    - hide playGame state
    - show end game modal


2. Set up leaderboard
  - Design data model for saving scores and names by difficulty level
  - On game end, save name and score to localStorage
  - Sort localStorage and print top 10 to leaderboards for each difficulty

3. Test for bugs

4. FINISH!
