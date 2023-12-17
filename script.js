let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        document.getElementById("start").disabled = true;
        document.getElementById("pause").disabled = false;
        document.getElementById("reset").disabled = false;
        document.getElementById("lap").disabled = false;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        document.getElementById("start").disabled = false;
        document.getElementById("pause").disabled = true;
    }
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(timer);
    startTime = 0;
    elapsedTime=0;
    updateDisplay();
    document.getElementById("start").disabled = false;
    document.getElementById("pause").disabled = true;
    document.getElementById("reset").disabled = true;
    document.getElementById("lap").disabled = true;
    lapTimes = [];
    updateLapList();
    timer = null; 
}

function recordLapTime() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        lapTimes.push(lapTime);
        updateLapList();
    }
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = isRunning ? currentTime - startTime : elapsedTime;

    const formattedTime = formatTime(elapsedTime);
    document.getElementById("minutes").innerText = formattedTime.minutes;
    document.getElementById("seconds").innerText = formattedTime.seconds;
    document.getElementById("milliseconds").innerText = formattedTime.milliseconds;
}


function formatTime(time) {
    const minutes = Math.floor(time / (60 * 1000)).toString().padStart(2, '0');
    const seconds = Math.floor((time % (60 * 1000)) / 1000).toString().padStart(2, '0');
    const milliseconds = (time % 1000).toString().padStart(3, '0');
    return { minutes, seconds, milliseconds };
}

function updateLapList() {
    const lapList = document.getElementById("lapList");
    lapList.innerHTML = "";
    lapTimes.forEach((lapTime, index) => {
        const lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${index + 1}: ${formatTime(lapTime).minutes}:${formatTime(lapTime).seconds}.${formatTime(lapTime).milliseconds}`;
        lapList.appendChild(lapItem);
    });
}
