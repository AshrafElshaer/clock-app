const editBtn = document.querySelector('#editBtn');

editBtn.addEventListener('click', () => {
    const listItems = document.querySelectorAll('.alarm .listItem');
    listItems.forEach(item => item.classList.toggle('active'));
})



const clockDisplay = document.querySelector('.clockDisplay');
const hoursDisplay = clockDisplay.querySelector('.hoursDisplay');
const minutesDisplay = clockDisplay.querySelector('.minutesDisplay');
const secondsDisplay = clockDisplay.querySelector('.secondsDisplay');
const amPmDisplay = clockDisplay.querySelector('.am-pm');

const displayCurrentTime = () => {

    const now = luxon.DateTime.local();
    hoursDisplay.textContent = now.toFormat('hh');
    minutesDisplay.textContent = now.toFormat('mm');
    secondsDisplay.textContent = now.toFormat('ss');
    amPmDisplay.textContent = now.toFormat('a');
}

setInterval(displayCurrentTime, 1000);


const alarmList = document.querySelector('.alarmList');

const findIndex = (id, alarms) => {
    let findAlarm = alarms.find(el => el => el.id == alarmContainer.dataset.id);
    let index = alarms.indexOf(findAlarm);
    return index;
}
const deleteAlarm = (e) => {
    const element = e.target;
    if (element.classList.contains('clear')) {
        const alarmContainer = element.parentElement;
        const index = findIndex(alarmContainer.dataset.id, alarms)

        alarms.splice(index, 1);
        upadateAlarmLocalStorage()
        alarmContainer.remove();

    }

}
const editDisplay = document.querySelector('.editAlarm');

const editAlarm = (e) => {
    const element = e.target;
    if (element.classList.contains('edit')) {
        const alarmContainer = element.parentElement;
        const findAlarm = alarms.find(el => el.id == alarmContainer.dataset.id);
        newAlarmDisplay.classList.add('active');
        newAlarmDisplay.id = 'editAlarm';
        newAlarmDisplay.setAttribute('data-id', findAlarm.id);
        hoursInput.value = findAlarm.hours;
        minutesInput.value = findAlarm.minutes;
        amPmInput.textContent = findAlarm.amPm
        // upadateAlarmLocalStorage();
    }
}
const activateToggle = (e) => {
    const element = e.target;
    if (element.classList.contains('toggleFill')) {
        const checkbox = element.previousElementSibling;
        const alarmListItem = element.parentElement.parentElement;
        const alarmId = alarmListItem.dataset.id;
        const findAlarm = alarms.find(el => el.id == alarmId);
        if (!checkbox.checked) {
            activateAlarm(alarmId)

        } else {
            deActivateAlarm(alarmId);
        }
        upadateAlarmLocalStorage()

    }
}
const activateAlarm = (alarmId) => {
    const allAlarms = document.querySelectorAll('.alarmList .listItem');
    allAlarms.forEach(alarm => {
        if (alarm.dataset.id === alarmId) {
            const findAlarm = alarms.find(el => el.id == alarmId);
            const checkBox = alarm.childNodes[7];
            findAlarm.isActive = true;
            alarm.dataset.isactive = 'true';
            checkBox.classList.add('activeAlarm');
            upadateAlarmLocalStorage()
        }
    })
}
const deActivateAlarm = (alarmId) => {
    const allAlarms = document.querySelectorAll('.alarmList .listItem');
    allAlarms.forEach(alarm => {
        if (alarm.dataset.id === alarmId) {
            const findAlarm = alarms.find(el => el.id == alarmId);
            const checkBox = alarm.childNodes[7];
            findAlarm.isActive = false;
            alarm.dataset.isactive = 'false';
            checkBox.classList.remove('activeAlarm');
            upadateAlarmLocalStorage()
        }
    })

}




alarmList.addEventListener('click', deleteAlarm);
alarmList.addEventListener('click', editAlarm);
alarmList.addEventListener('click', activateToggle)

const activeAlarms = () => {
    alarms.forEach(alarm => {
        if (alarm.isActive === true) {
            if (alarm.hours == hoursDisplay.textContent && alarm.minutes == minutesDisplay.textContent && alarm.amPm == amPmDisplay.textContent) {
                const alarmSound = new Audio('../../iphone_annoying.mp3');
                const alarmActiveDisplay = document.querySelector('.activeAlarmDisplay');
                const alarmActiveTimeDisplay = document.querySelector('.activeAlarmTime')
                const stopAlarmBtn = document.querySelector('.stop');
                alarmActiveDisplay.style.display = 'flex';
                alarmActiveTimeDisplay.textContent = `${alarm.hours}:${alarm.minutes} ${alarm.amPm}`
                alarmSound.load()
                alarmSound.play()

                stopAlarmBtn.addEventListener('click',function(){
                    alarmSound.pause();
                    alarmActiveDisplay.style.display = 'none';
                    deActivateAlarm(`${alarm.id}`);
                })

            }
        }
    })
}

setInterval(function () {
    const seconds = new Date().getSeconds();
    if (seconds === 0) activeAlarms();
}, 1000);



// setInterval(activeAlarms,)