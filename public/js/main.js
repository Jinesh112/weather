
// variable whom are need dyanmic data to show that all called here 
// like submitbtn, cityName, city_name, temp_real_val.

const submitbtn = document.getElementById('submitbtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = `plese enter the city name`;
    } else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=1fe04d59bb40e8f84c0f93f5efda3057`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            temp_real_val.innerText = arrData[0].main.temp;
            city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
            const tempMood = arrData[0].weather[0].main;
            if (tempMood == "Clear") {
                temp_status.innerHTML = " <p class='clear' style='color:orangered';>☀</p>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = " <p class='clouds' style='color:skyblue';>☁</p>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML = " <p class='rain' style='color:skyblue';>🌧</p>";
            } else {
                temp_status.innerHTML = " <p class='normal' style='color:skyblue';>❄</p>";
            }

        } catch {
            city_name.innerText = `plese enter the correct city name`;
        }
    }
}

submitbtn.addEventListener('click', getInfo);

// main is submitbtn so we called new function in submitbtn (getInfo)
// in if condition we check if user not write city name
// else part (try)we fetch api and display temp,city,country
// else(catch) user not write city name


