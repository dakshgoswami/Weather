const apiKey = "c27aee1d8d5968861f4f0f4c66c703d9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

var mainWrapper = document.querySelector(".display-container");
var showIcon = document.querySelector(".img-icon");
var showTemp = document.querySelector(".temp");
var cityName = document.querySelector(".city-name");
var showHumidity = document.querySelector(".humidity-per");
var showWindSpeed = document.querySelector(".show-speed");
var inputBox = document.querySelector(".search-box");
var errorBlock = document.querySelector(".error");

const searchBtn = document.querySelector(".search-btn");

async function weatherCast(city) {
  const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
  var data = await response.json();
  //   console.log(data);

  if (response.status === 404) {
    errorBlock.style.display = "block";
    mainWrapper.style.display = "none";
  } else {
    errorBlock.style.display = "none";
    showTemp.innerHTML = Math.round(data.main.temp) + "°C";
    cityName.innerHTML = data.name;
    showHumidity.innerHTML = data.main.humidity + "%";
    showWindSpeed.innerHTML = Math.round(data.wind.speed) + "km/hr";
    if (data.weather[0].main == "Clouds") {
      showIcon.src = "./Weather-Assets/cloudy.png";
    } else if (data.weather[0].main == "Clear") {
      showIcon.src = "./Weather-Assets/clear.png";
    } else if (data.weather[0].main == "Thunderstorm") {
      showIcon.src = "./Weather-Assets/strom.png";
    } else if (data.weather[0].main == "Rain") {
      showIcon.src = "./Weather-Assets/rainy.png";
    }
    mainWrapper.style.display = "block";
  }
}

searchBtn.addEventListener("click", function () {
  weatherCast(inputBox.value);
});
