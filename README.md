# Bugscape JS

The 3rd project in Udacity's Frontend Web Developer Nanodegree curriculum, Bugscape JS intends to showcase a student's understanding of Object-Oriented JavaScript and HTML5 Canvas manipulation.

I extended the scope of the project in two ways: 
1. Included multiple difficulty levels
2. Used firebase.io as a JSON-based backend to power all-time leaderboards.

Play 'Bugscape JS' online at [http://jsandlund.github.io/udacity-bugscapeJS](http://jsandlund.github.io/udacity-bugscapeJS)

## Future Improvements

The implementation of game "states" and "views" was hacked together ad hoc, with little guidance on best practice. It's messy! I know there's room for improvement here. I plan to re-factor this code in the future to adhere to an MVC architecture.

## Game Instructions
- **Overview** The object of the game is to score as many points as possible **in less than 30 seconds**.
- **Scoring Points** To score 1 point you must dodge the bugs and safely make it to the water.
- **Lives** You have 3 lives. If a bug hits you you lose 1 life and 1 point will be deducted from your score. (Why yes, you can go into negative points!)
- **Difficulty Levels** You can choose your difficulty level: Easy, Medium, or Hard. The difficulty level affects the number of bugs you'll need to escape.
- **How good are you?** Check the leaderboards when the game ends. For each difficulty the Top 10 all-time scores are celebrated. (Thanks Firebase!)
- **Player Movement** Move the player using the arrow keys: up, down, left, and right.

## Attribution
- **Bootstrap + Bootswatch** for taking the heavy lifting out of styling https://bootswatch.com/superhero/
- **Firebase.io** for making server-side storage possible for an amateur! https://firebase.io (beautiful documentation!)
- **Steve Harrison** for his SO answer that helped me better understand execution context:  http://stackoverflow.com/questions/1101668/how-to-use-settimeout-to-invoke-object-itself
