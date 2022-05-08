const addAlarm = document.querySelector('#addAlarm');
const newAlarmDisplay = document.querySelector('.newAlarm');
const hoursInput = document.querySelector('#hoursInput');
const minutesInput = document.querySelector('#minutesInput');
const amPmInput = document.querySelector('#am-pm');


const alarms = getLocalStorage() || [];



// __________________________________________

addAlarm.addEventListener('click', () => {
    newAlarmDisplay.classList.add('active');
    hoursInput.value = hoursDisplay.textContent;
    minutesInput.value = minutesDisplay.textContent;
    amPmInput.textContent = amPmDisplay.textContent
});


const upBtn = document.querySelectorAll('.up');
const downBtn = document.querySelectorAll('.down');

const switchAm = (input) => {
    if (input.textContent === 'AM') {
        input.textContent = 'PM';
    } else {
        input.textContent = 'AM'
    }

}


upBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        const input = this.nextElementSibling;
        const inputMin = parseInt(input.min);
        const inputMax = parseInt(input.max);
        let inputValue = parseInt(input.value);
        inputValue += 1
        input.value = inputValue.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });;

        if (inputValue === inputMax + 1) input.value = inputMin.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });

        if (input.id === 'am-pm') switchAm(input);


    })
});
downBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        const input = this.previousElementSibling;
        const inputMin = parseInt(input.min);
        const inputMax = parseInt(input.max);
        let inputValue = parseInt(input.value);
        inputValue -= 1
        input.value = inputValue.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });;

        if (inputValue === inputMin - 1) input.value = inputMax.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });

        if (input.id === 'am-pm') switchAm(input);
    })
});




const saveAlarm = document.querySelector('#newAlarm');
const cancelNewAlarm = document.querySelector('#cancelAlarm');

saveAlarm.addEventListener('click', () => {
    newAlarmDisplay.classList.remove('active');

    if (!newAlarmDisplay.id) {
        const newAlarm = {
            id: Date.now(),
            isActive: true,
            hours: parseInt(hoursInput.value).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
            }),
            minutes: parseInt(minutesInput.value).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
            }),
            amPm: amPmInput.textContent
        }
        alarms.push(newAlarm);
        displayAlarm(newAlarm);
    }

    if(newAlarmDisplay.id === 'editAlarm'){

        const findAlarm = alarms.find(el => el.id == newAlarmDisplay.dataset.id);

        findAlarm.hours = hoursInput.value
        findAlarm.minutes = minutesInput.value
        findAlarm.amPm = amPmInput.textContent;

        const allAlarms = document.querySelectorAll('.alarmList .listItem');
       allAlarms.forEach(alarm => {
           if(alarm.dataset.id == findAlarm.id){
            alarm.childNodes[3].textContent = `${hoursInput.value}:${minutesInput.value}`
            alarm.childNodes[5].textContent = amPmInput.textContent
           }
        })
        newAlarmDisplay.removeAttribute('data-id');
        newAlarmDisplay.removeAttribute('id');
        
    }

    upadateAlarmLocalStorage();


})
cancelNewAlarm.addEventListener('click', () => {
    newAlarmDisplay.classList.remove('active');
})



const displayAlarm = (alarmInfo) => {

    const html = `
       <li class="listItem" data-id="${alarmInfo.id}" data-isActive="${alarmInfo.isActive}">
          <button class="material-icons btn-cta edit">
             edit
          </button>
          <span class="time">${alarmInfo.hours}:${alarmInfo.minutes}</span>
          <span class="am-pm">${alarmInfo.amPm}</span>
          <label class="toggle">
             <input type="checkbox" class="toggleInput">
             <div class="toggleFill"></div>
           </label>
           <button class="material-icons btn-cta clear">
                clear
            </button>
        </li>`;
    alarmList.innerHTML += html;
  if(alarmInfo.isActive === true){
      activateAlarm(`${alarmInfo.id}`);
  }

}







// ___________________________________
function upadateAlarmLocalStorage() {
    localStorage.setItem('alarms', JSON.stringify(alarms));
}

function getLocalStorage() {
    let data = localStorage.getItem('alarms')
    let array = JSON.parse(data);
    return array
}

function showCase() {
    if (!alarms) return;
    alarms.map(city => displayAlarm(city));
}
showCase();