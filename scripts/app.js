//dom manipulation and event handling
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img'); 

const updateUI = (data) => {

    const cityDets = data.cityDets;
    const weather = data.weather;

    //console.log(cityDets);
    //console.log(weather.IsDayTime, weather.WeatherIcon);
    //console.log(icon.src);

    //destructuring alternate
    // const {cityDets, weather} = data;

    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    //update icon
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    //update night and date images
    let timeSrc = null;
    if (weather.IsDayTime){
        timeSrc='img/day.svg';
    }else {
        timeSrc='img/night.svg';
    }
    time.setAttribute('src', timeSrc);
    // time.src=`img/icons/${weather.WeatherIcon}.svg`;
    // console.log('the time image is ', time.src);

    //remove d-none class if present
    if (card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}


const updateCity = async (city) => {

    //console.log(city);
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets: cityDets,
        weather: weather
    };

};

cityForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    //get the city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the UI with the new city
    updateCity(city)
    .then(data=>updateUI(data))
    .catch(err=>console.log(err));

    //set local storage
    localStorage.setItem('city', city);

});

if (localStorage.getItem('city')){
    //update the UI
    updateCity(localStorage.getItem('city'))
        .then(data=>updateUI(data))
        .catch(err=>console.log(err));
}