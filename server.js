const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is running!');
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

let gameState = {};

// Functions -------------------------------------------------------------------------------

/**
 * The following function sets ranges for the number that is being guessed based
 * on difficulty.
 * @param {string} difficulty 
 * @returns a random integer number that is based on the difficulty selected
 */
function generateRandomNumber(difficulty) {
    var range;
    if (difficulty === 'easy') {
        range = 10;
    } else if (difficulty === 'medium') {
        range = 50;
    } else {
        range = 100;
    }
    return Math.floor(Math.random() * range) + 1;
}

function generateHint(guess, randomNumber) {
    if (guess < randomNumber) {
        return "Too low!";
    } else if (guess > randomNumber) {
        return "Too high!";
    } else {
        return "Correct!";
    }
}

function grantExtraLife(gameState) {
    const max_lives = 5; // Set a maximum limit for lives
    if (gameState.lives < max_lives) {
        gameState.lives += 1;
        return 'You gained an extra life!';
    } else {
        return 'Maximum lives reached!';
    }
}


// The following endpoints are POST endpoints -----------------------------------------------

app.post('/start', (req, res, next) => {
    const {difficulty} = req.body; // get the player's difficulty from the frontend

    if (!difficulty) {
        const error = new Error('Difficulty is required');
        error.status = 400;
        return next(error);
    }

    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        const error = new Error('Invalid difficulty level! Choose between easy, medium or hard');
        error.status = 400;
        return next(error);
    }

    gameState = {
        difficulty,
        randomNumber: generateRandomNumber(difficulty),
        lives: 0,
        stars: 0,
    };

    // Set lives based on difficulty
    if (difficulty === 'easy') {
        gameState.lives = 5;
    } else if (difficulty === 'medium') {
        gameState.lives = 3;
    } else {
        gameState.lives = 1;
    }

    res.json({message: 'Game started!', gameState}); // response object
});

app.post('/guess', (req, res) => {
    const {guess} = req.body; // get the player's guess from the frontend

    if (guess === gameState.randomNumber) { // gives the player a star for guessing right
        gameState.stars += 1;

        const extraLife = grantExtraLife(gameState);

        if (gameState.stars >= 3) { // the player wins the whole game
            return res.json({result: 'win', gameState});
        }

        gameState.randomNumber = generateRandomNumber(gameState.difficulty); // generates a random number again
        return res.json({result: 'correct', message: `You won this round, player ${extraLife}`, gameState}); // returns correct when guess is right

    } else {
        gameState.lives -= 1; // removes a life when the guess isn't right

        if (gameState.lives <= 0) { // game is over when all lives are lost
            return res.json({result: 'lose', gameState});
        }

        const hint = generateHint(guess, gameState.randomNumber);

        return res.json({result: 'incorrect', hint, gameState}); // the guess is incorrect
    }
});

app.post('/restart', (req, res) => {
    const {difficulty} = req.body;

    gameState = {
        difficulty,
        randomNumber: generateRandomNumber(difficulty),
        lives: 0,
        stars: 0,
    };

    // Set lives based on difficulty
    if (difficulty === 'easy') {
        gameState.lives = 5;
    } else if (difficulty === 'medium') {
        gameState.lives = 3;
    } else {
        gameState.lives = 1;
    }

    res.json({message: 'Game restarted!', gameState}); // response object

});

// The following endpoints are GET endpoints ------------------------------------------------

app.get('/state', (req, res) => {
    res.json(gameState); // Send the current game state to the frontend
});

app.get('/lives', (req, res) => {
    res.json({lives: gameState.lives}); // Send the player's remaining lives to the frontend
});

app.get('/stars', (req, res) => {
    res.json({stars: gameState.stars}); // Send the player's stars to the frontend
});

app.get('/hint', (req, res) => {
    if (gameState.randomNumber) {
        const hint = generateHint(gameState.previousGuess || 0, gameState.randomNumber);
        res.json({ hint });
    } else {
        res.status(400).json({ error: 'Game not started or no number generated.' });
    }
});

// Error handling

app.use((err, req, res, next) => {
    console.error(err.stack); // Log error for debugging
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json({error: message});
});

console.log(gameState);


// Include the line below to run the vitests
//export {generateRandomNumber, generateHint, grantExtraLife}
