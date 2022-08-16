console.log('This Javascript from client-side...Yayyyy!😎');

const formEl = document.querySelector('form');
const inputEl = document.querySelector('.inputSearch');
const addressEl = document.querySelector('.city');
const countryEl = document.querySelector('.country');
const temperatureEl = document.querySelector('.temperature');
const descriptionEl = document.querySelector('.description');
const humidityEl = document.querySelector('.humidity--no');
const weatherEl = document.querySelector('.weather--name');
const visibilityEl = document.querySelector('.visibility--no');
const flagEl = document.querySelector('.flagImg');
const mainEl = document.querySelector('main');
const dateEl = document.querySelector('.date');

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = inputEl.value;

    fetch(`http://localhost:1999/weather?address=${address}`).then(response => {
        response.json().then(data => {
            if(data.error) {
                console.log(data.error.message);
            } else {
                console.log(data);
                mainEl.classList.remove('hidden');
                dateEl.textContent = currentDate();
                addressEl.textContent = data.address;
                countryEl.textContent = data.country;
                temperatureEl.textContent = Math.trunc(data.temperature);
                descriptionEl.textContent = data.description;
                humidityEl.textContent = data.humidity;
                weatherEl.textContent = data.weather;
                visibilityEl.textContent = Math.trunc(data.visibility / 1000);
                flagEl.src = data.flag;
                inputEl.value = '';
                inputEl.blur();

            }
        })
    })
})

function currentDate () {
    const d = new Date();
    const date = d.getDate();
    const day = d.toLocaleDateString('en-US', {weekday: 'short'})
    const month = d.toLocaleDateString('en-US', {month: 'short'});
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}


