async function selectDifficulty(difficulty) {
    try {
        // Send the difficulty to the backend
        const response = await fetch('http://localhost:8000/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ difficulty }), // Pass the selected difficulty
        });

        const result = await response.json(); // Get the updated game state

        if (difficulty === 'easy') {
            window.location.href = 'easy.html';
        } else if (difficulty === 'medium') {
            window.location.href = 'medium.html';
        } else if (difficulty === 'hard') {
            window.location.href = 'hard.html';
        }
        
    } catch (error) {
        console.error('Error selecting difficulty:', error);
        alert('Failed to start the game. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const playerNameInput = document.getElementById('playerName');
    const submitButton = document.getElementById('submitName');

    submitButton.addEventListener('click', (event) => {
        const playerName = playerNameInput.value.trim(); // Get and trim the input: players name
        if (playerName) {
            // keep the player's name in the local storage to use in other JS files
            localStorage.setItem('playerName', playerName);
        } else {
            // The player must enter their name
            event.preventDefault();
            alert('Please enter your name!');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const playerNameDisplay = document.getElementById('playerNameDisplay');

    // Retrieve the player's name from localStorage
    const playerName = localStorage.getItem('playerName');

    if (playerName) {
        playerNameDisplay.textContent = playerName;
    } else {
        console.error('Player name not found!');
    }
});