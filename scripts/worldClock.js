const form = document.querySelector('#cityInput');
const worldClockCities = getLocalStorage() || [];

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const cityName = form.querySelector('#cityName');
    if (!cityName.value) return;

    findCity(cityName.value)
    cityName.value = '';
});




const findCity = async (cityName) => {
    const config = {
        params: {
            address: cityName,
            key: 'AIzaSyDbWEAryKuJVkcmsPiNxu_Q4Gzug8K5DYw'
        }
    }
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', config);
        const cityInfo = {
            lat: response.data.results[0].geometry.location.lat,
            lng: response.data.results[0].geometry.location.lng,
            city: response.data.results[0].address_components[0].short_name,
            country: response.data.results[0].address_components[response.data.results[0].address_components.length - 1].short_name
        }

        findTimeZone(cityInfo);
    } catch {

        alert('Invalid , Try Again')

    }


};

const findTimeZone = async (cityInfo) => {
    const time = Math.round(Date.now() / 1000);
    const config = {
        params: {
            location: `${cityInfo.lat},${cityInfo.lng}`,
            timestamp: time,
            key: 'AIzaSyDbWEAryKuJVkcmsPiNxu_Q4Gzug8K5DYw'
        }
    }
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/timezone/json', config);

        const timeZone = response.data.timeZoneId;
        const allInfo = {
            timeZone: timeZone,
            info: {
                city: cityInfo.city,
                country: cityInfo.country
            }
        }
        worldClockCities.push(allInfo)
        upadateLocalStorage();
        displayClock(timeZone, cityInfo);
    } catch{
        alert('Invalid , Try Again')
    }

}

const displayClock = (timeZone, cityInfo) => {

    const now = luxon.DateTime.local().setZone(`${timeZone}`);
    const formated = now.toFormat('hh:mm');
    const amPm = now.toFormat('a');
    const citiesList = document.querySelector('.world .cities');
    const html = `
    <li class="listItem" data-timeZone="${timeZone}" data-city="${cityInfo.city}">
         <span class="cityName">${cityInfo.city} , ${cityInfo.country}</span>           
        <span class="time">${formated}</span>
        <span class="am-pm">${amPm}</span>
        <button class="material-icons clear" id="clear">
            clear
        </button>
   </li>
    `;
    citiesList.innerHTML += html;

}

const updateTime = function () {
    const items = document.querySelectorAll('.world .listItem');
    items.forEach(item => {
        const now = luxon.DateTime.local().setZone(item.dataset.timezone);
        const formated = now.toFormat('hh:mm');
        const amPm = now.toFormat('a');
        const timeDisplay = item.querySelector('.time');
        const amPmDisplay = item.querySelector('.am-pm')
        timeDisplay.textContent = formated;
        amPmDisplay.textContent = amPm;
    })
}


setInterval(function () {
    const date = new Date();
    const seconds = date.getSeconds();
    if (seconds === 0) updateTime();
}, 1000);


const citiesList = document.querySelector('.world .cities');

const deleteCity = (e) => {
    const element = e.target
    if (element.id === 'clear') {
        const city = element.parentElement.dataset.city;
        const index = worldClockCities.indexOf(worldClockCities.find(el => {
            return el.info.city === city;
        }));
        worldClockCities.splice(index, 1);
        element.parentElement.remove();
        upadateLocalStorage();
    }
}
citiesList.addEventListener('click', deleteCity);






// _______________________________________________________
function upadateLocalStorage() {
    localStorage.setItem('worldClockCities', JSON.stringify(worldClockCities));
}

function getLocalStorage() {
    let data = localStorage.getItem('worldClockCities')
    let array = JSON.parse(data);
    return array
}

function showCase() {
    if (!worldClockCities) return;
    worldClockCities.map(city => displayClock(city.timeZone, city.info));
}
showCase();
