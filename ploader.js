document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup-container');
    popup.classList.remove('hidden');
    setTimeout(() => {
        popup.classList.add('hidden');
        window.location.href = '../Labiba_Code/gamemenu.html';
    }, 4000);
});