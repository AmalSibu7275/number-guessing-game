async function fetchLives() {
  try {
      const response = await fetch('http://localhost:8000/lives'); // Backend endpoint
      const data = await response.json(); // Parse the response
      console.log('Lives fetched:', data.lives);
      displayLives(data.lives); // Update the frontend
  } catch (error) {
      console.error('Error fetching lives:', error);
  }
}

function showPopup() {
  document.getElementById("popup").style.display = "block";
  fetchLives(); // Fetch lives when the popup is displayed
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function displayLives(lives) {
  const heartDisplay = document.getElementById('heartDisplay'); // The DOM element to display lives
  console.log('Displaying lives:', lives);
  heartDisplay.innerHTML = "❤️".repeat(lives); // Display hearts based on lives
}