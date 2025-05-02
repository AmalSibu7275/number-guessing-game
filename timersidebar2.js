document.addEventListener('DOMContentLoaded', () => {
    let timeLeftElement = document.getElementById('timeLeft');
    let progressCircle = document.getElementById('progressCircle');
    let duration = 10; 
    let startTime = Date.now();

    function updateTimer() {
        let elapsedTime = Date.now() - startTime;
        let remainingTime = duration - Math.floor(elapsedTime / 1000);

        if (remainingTime < 0) remainingTime = 0;

        let progress = (remainingTime / duration) * 100;

        timeLeftElement.textContent = remainingTime;

        let dashoffset = 565.48 - (progress / 100) * 565.48;  // 565.48 is the circumference of the circle
        progressCircle.style.strokeDashoffset = dashoffset;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
        }
    }

    let timerInterval = setInterval(updateTimer, 1000);
});

