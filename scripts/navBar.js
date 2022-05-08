const navBarBtns = document.querySelectorAll('nav .btn');
const sections = Array.from(document.querySelectorAll('section'));
const title = document.querySelector('#title');

const switchTheme = document.querySelector('#switchTheme');


navBarBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        navBarBtns.forEach(el => el.classList.remove('clicked'));
        this.classList.add('clicked');

        if (this.id === 'worldClock') {
            const WorldClock = sections.find(el => el.className === 'world');
            sections.forEach(el => el.style.display = 'none');
            WorldClock.style.display = 'block';
            title.textContent = 'World Clock';
        }

        if (this.id === 'alarm') {
            const alarm = sections.find(el => el.className === 'alarm');
            sections.forEach(el => el.style.display = 'none');
            alarm.style.display = 'block';
            title.textContent = 'Alarm';

        }
        if (this.id === 'stopWatch') {
            const stopWatch = sections.find(el => el.className === 'stopWatch');
            sections.forEach(el => el.style.display = 'none');
            stopWatch.style.display = 'block';
            title.textContent = 'Stop Watch';

        }
        if (this.id === 'timer') {
            const timer = sections.find(el => el.className === 'timer');
            sections.forEach(el => el.style.display = 'none');
            timer.style.display = 'block';
            title.textContent = 'Timer';

        }
    })
})

switchTheme.addEventListener('click', () => {
    const body = document.querySelector('body');
    if (body.className === 'light-theme') {
        body.className = 'dark-theme';
        switchTheme.textContent = 'light_mode'
    } else {
        body.className = 'light-theme';
        switchTheme.textContent = 'dark_mode'
    }
});

switchTheme.addEventListener('mousedown', () => {
    switchTheme.classList.add('clicked');
})
switchTheme.addEventListener('mouseup', () => {
    switchTheme.classList.remove('clicked');
})
