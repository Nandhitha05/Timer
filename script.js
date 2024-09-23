let countdown;
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const timeInput = document.getElementById('timeInput');
const timeUnit = document.getElementById('timeUnit');
const alertSound = document.getElementById('alertSound'); 

function startTimer() {
    let timeValue = parseInt(timeInput.value);
    const unit = timeUnit.value;

    if (isNaN(timeValue) || timeValue <= 0) {
        alert("Please enter a valid time!");
        return;
    }

    let seconds;

   
    if (unit === "seconds") {
        seconds = timeValue;
    } else if (unit === "minutes") {
        seconds = timeValue * 60;
    } else if (unit === "hours") {
        seconds = timeValue * 3600;
    }

    startBtn.disabled = true;
    timeInput.disabled = true;
    timeUnit.disabled = true;

    displayTime(seconds);

    countdown = setInterval(() => {
        seconds--;
        displayTime(seconds);

        if (seconds <= 0) {
            clearInterval(countdown);
            alertSound.play(); 
            alert("Time's up!");
            reset();
        }
    }, 1000);
}

function displayTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    display.textContent = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function reset() {
    clearInterval(countdown);
    display.textContent = "00:00:00";
    startBtn.disabled = false;
    timeInput.disabled = false;
    timeUnit.disabled = false;
    timeInput.value = '';
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', reset);
