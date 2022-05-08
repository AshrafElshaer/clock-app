const startBtn = document.querySelector('#stopWatchStart');
const resetBtn = document.querySelector('#stopWatchReset');
const labList = document.querySelector('.labDisplay .scroll');


let milliSeconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let labCount = 0;


const stopWatchMilliSecondsDisplay = document.querySelector('.watchTimerMilliSeconds');
const stopWatchSecondsDisplay = document.querySelector('.watchTimerSeconds');
const stopWatchMinutesDisplay = document.querySelector('.watchTimerMinutes');
const stopWatchHoursDisplay = document.querySelector('.watchTimerHours');


const startStopWatch = () => {

    milliSeconds += 1;
    stopWatchMilliSecondsDisplay.textContent = milliSeconds.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    if (milliSeconds === 99) {
        seconds += 1;
        milliSeconds = 0;
        stopWatchSecondsDisplay.textContent = seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
    }
    if (seconds === 60) {
        seconds = 0;
        minutes += 1;
        stopWatchMinutesDisplay.textContent = minutes.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });

        stopWatchSecondsDisplay.textContent = seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });

    }
    if(minutes === 60){
        hours += 1 ;
        minutes = 0;
        stopWatchHoursDisplay.textContent = hours.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
        stopWatchMinutesDisplay.textContent = minutes.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
    }

}

let start;

const startCounting = function() {

    if (this.classList.contains('start')) {
        start = setInterval(startStopWatch, 10);
        this.classList.remove('start');
        this.textContent = 'Pause';
        resetBtn.textContent = 'Lab';
        resetBtn.classList.remove('reset');
    } else if (!this.classList.contains('start')) {
        clearInterval(start)
        start = null;
        this.classList.add('start');
        this.textContent = 'Start';
        resetBtn.textContent = 'Reset';
        resetBtn.classList.add('reset');
    }
}

const resetCounting = function () {

    if (this.classList.contains('reset')) {
        const labsList = document.querySelectorAll('.labDisplay .listItem')
        milliSeconds = 0;
        seconds = 0;
        minutes = 0;
        hours = 0;
        labCount = 0;

        stopWatchMilliSecondsDisplay.textContent = milliSeconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });

        stopWatchSecondsDisplay.textContent = minutes.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
        stopWatchMinutesDisplay.textContent = minutes.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
        stopWatchHoursDisplay.textContent = hours.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
        labsList.forEach(list => list.remove());
    }
    if (!this.classList.contains('reset')) {
        labCount += 1;
        const time = `${stopWatchHoursDisplay.textContent}:${stopWatchMinutesDisplay.textContent}:${stopWatchSecondsDisplay.textContent}:${stopWatchMilliSecondsDisplay.textContent}`
        

        const html = `<li class="listItem">
        <span class="labCount">${labCount.toString()}</span>
         <span class="lab">Lap</span>
         <span class="time">${time}</span>
        </li>`
        
        labList.innerHTML += html;
    }

}

startBtn.addEventListener('mousedown',function(){this.classList.add('clicked')});
startBtn.addEventListener('mouseup',function(){this.classList.remove('clicked')});
startBtn.addEventListener('click', startCounting);

resetBtn.addEventListener('mousedown',function(){this.classList.add('clicked')});
resetBtn.addEventListener('mouseup',function(){this.classList.remove('clicked')});
resetBtn.addEventListener('click', resetCounting);
