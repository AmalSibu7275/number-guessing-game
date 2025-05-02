document.addEventListener('DOMContentLoaded', () => {
    const mainMenuButton = document.getElementById('main-menu-button');

    mainMenuButton.addEventListener('click', async () => {
        try {
            // restart the game
            await fetch('http://localhost:8000/restart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ difficulty: 'easy' }), 
            });

            // Go back to the main menu
            window.location.href = '../Amal_Code/ploader.html';
        } catch (error) {
            console.error('Error restarting the game:', error);
            alert('Failed to restart the game. Please try again.');
        }
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:8000/state');
        const data = await response.json();

        const difficultyElement = document.getElementById('difficulty-level');
        difficultyElement.textContent = data.difficulty || 'Unknown';

        console.log('Game state:', data);
    } catch (error) {
        console.error('Error fetching game state:', error);
    }
});