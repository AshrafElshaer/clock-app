const timerStartBtn = document.querySelector('#timerStart');
const timerResetBtn = document.querySelector('#timerReset');
const timeInputWrapper = document.querySelector('.timer .timeInputWrapper');







const stratTimer = () => {

    const hoursInput = document.querySelector('.timer #hoursInput');
    const minutesInput = document.querySelector('.timer #minutesInput');
    const secondsInput = document.querySelector('.timer #secondsInput');

    let seconds = secondsInput.value;
    let minutes = minutesInput.value;
    let hours = hoursInput.value;

    if (seconds == 0 && minutes == 0 && hours == 0) {
        clearInterval(startCountingDown);
        const alarmSound = new Audio('../../iphone_annoying.mp3');
        const alarmActiveDisplay = document.querySelector('.activeAlarmDisplay');
        const alarmActiveTimeDisplay = document.querySelector('.activeAlarmTime')
        const stopAlarmBtn = document.querySelector('.stop');
        alarmActiveDisplay.style.display = 'flex';
        alarmActiveTimeDisplay.textContent = 'Timer Ended'
        alarmSound.load()
        alarmSound.play()

        stopAlarmBtn.addEventListener('click', function () {
            alarmSound.pause();
            alarmActiveDisplay.style.display = 'none';
            resetTimer()
        })
    }

    seconds -= 1;
    secondsInput.value = seconds.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });

    if (seconds === -1) {
        minutes -= 1;
        seconds = 59;
        minutesInput.value = minutes.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
        secondsInput.value = seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
    }


    if (minutes === -1) {
        hours -= 1;
        minutes = 59;
        hoursInput.value = hours.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
        minutesInput.value = minutes.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
    }

    

}



let startCountingDown;


timerStartBtn.addEventListener('click', function () {
    if (this.classList.contains('start')) {
        this.textContent = 'Pause';
        startCountingDown = setInterval(stratTimer, 1000);
        this.classList.remove('start');
        timeInputWrapper.classList.add('active');

    } else if (!this.classList.contains('start')) {
        clearInterval(startCountingDown);
        this.textContent = 'Start';
        this.classList.add('start');
        startCountingDown = null;
    }

})

const resetTimer = ()=>{
    const hoursInput = document.querySelector('.timer #hoursInput');
    const minutesInput = document.querySelector('.timer #minutesInput');
    const secondsInput = document.querySelector('.timer #secondsInput');

    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    clearInterval(startCountingDown)

    secondsInput.value = seconds.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    minutesInput.value = minutes.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    hoursInput.value = hours.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    timeInputWrapper.classList.remove('active');
    timerStartBtn.textContent = 'Start';
    if (timerStartBtn.classList.contains('strat')) return
    timerStartBtn.classList.add('start');
}
timerResetBtn.addEventListener('click', resetTimer)




timerStartBtn.addEventListener('mousedown',function(){this.classList.add('clicked')});
timerStartBtn.addEventListener('mouseup',function(){this.classList.remove('clicked')});

timerResetBtn.addEventListener('mousedown',function(){this.classList.add('clicked')});
timerResetBtn.addEventListener('mouseup',function(){this.classList.remove('clicked')});
