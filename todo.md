1. Set up game states: createGame, playGame, endGame
  - state_createGame
    - show createGame card
    - Input username
    - Select difficulty
  - state_playGame
    - hide createGame card
    - start game engine
      - scoring of points
      - collission events
      - lives
      - timer
  - state_endGame
    - stop game engine
    - hide playGame state



2. Set up countdown timer, lifeCounter, pointsCounter
  - game should end when time is up OR lives = 0

3. Set up leaderboard
  - Design data model for saving scores and names by difficulty level
  - On game end, save name and score to localStorage
  - Sort localStorage and print top 10 to leaderboards for each difficulty

4. Test for bugs

5. FINISH!
