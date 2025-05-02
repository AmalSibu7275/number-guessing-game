document.addEventListener('DOMContentLoaded', () => {
    let popup = document.getElementById('popup');
    let submitButton = document.getElementById('submitButton');
    let closeButton = document.getElementById('closePopup');
    let crow1 = popup.querySelector('#crow1'); 
    let crow2 = popup.querySelector('#crow2'); 
    let ghost = popup.querySelector('#ghost');
    let ghost3 = popup.querySelector('#ghost3');
    const userInput = document.getElementById("userInput");


    let attempts = 0;
    const maxAttempts = 3;

    function openPopup() { // Opens the popup
        popup.classList.add('open-popup');
    }

    function closePopup() { // Closes the popup
        popup.classList.remove('open-popup');
        crow1.style.display = 'none';
        crow2.style.display = 'none';
        ghost.style.display = 'none';
        ghost3.style.display = 'none';
        userInput.value = "";
    }

    async function checkGuess() { // Checks the guess using the backend code
        const userInput = document.getElementById("userInput").value;
        const userGuess = parseInt(userInput);
    
        if (userInput === "" || isNaN(userGuess)) {
            alert("Enter a valid number!");
            return;
        }
    
        try {
            // Send the user's guess to the backend
            const response = await fetch('http://localhost:8000/guess', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ guess: userGuess }),
            });
    
            const result = await response.json();
            console.log(result); // Debugging
    
            // Handle the result from the backend
            if (result.result === 'win') {
                ghost.style.display = 'block';
                openPopup();
                setTimeout(() => {
                    window.location.href = 'WIN.html';
                }, 3000);
            } else if (result.result === 'correct') {
                ghost.style.display = 'block';
                openPopup();
                alert(result.message);
                setTimeout(() => {
                    const currentHref = window.location.href;
                    const baseName = currentHref.substring(currentHref.lastIndexOf('/') + 1); // Get the current file name (e.g., "easy.html")
                
                    const match = baseName.match(/([a-z]+)(\d*)\.html$/); // Match "easy.html", "easy2.html", etc.
                    if (match) {
                        const currentDifficulty = match[1]; // Extract difficulty like the easy difficulty
                        const currentLevel = match[2] ? parseInt(match[2]) : 1; // Extract level, default to 1 if missing
                
                        const nextLevel = currentLevel + 1;
                        const nextPage = `${currentDifficulty}${nextLevel}.html`; // Go to the next page in series
                
                        // Redirect to the next page
                        window.location.href = nextPage;
                    } else {
                        console.error("Could not determine the next page URL. Ensure the filenames follow the format: [difficulty][level].html");
                    }
                }, 3000);
            } else if (result.result === 'lose') {
                ghost3.style.display = 'block';
                openPopup();
                setTimeout(() => {
                    window.location.href = 'LOSE.html';
                }, 3000);
            } else if (result.result === 'incorrect') {
                if (result.hint === 'Too high!') {
                    crow1.style.display = 'block';
                } else if (result.hint === 'Too low!') {
                    crow2.style.display = 'block';
                }
                openPopup();
            }
        } catch (error) {
            console.error('Error checking guess:', error);
        }
    }    

    async function fetchGameState() {
        try {
            const response = await fetch('http://localhost:8000/state');
            const data = await response.json();
            console.log(data); // Debugging
    
            // Update the UI with the game state
            document.getElementById("heartDisplay").innerHTML = "❤️".repeat(data.lives);
            document.getElementById("starDisplay").textContent = `Stars: ${data.stars}`;
        } catch (error) {
            console.error('Error fetching game state:', error);
        }
    }
    
    // Call fetchGameState when the page loads
    fetchGameState();

    submitButton.addEventListener('click', checkGuess);
    closeButton.addEventListener('click', closePopup);
});


