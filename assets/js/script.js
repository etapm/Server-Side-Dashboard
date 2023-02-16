// get references to HTML elements
const searchBtn = document.querySelector("button");
const searchInput = document.querySelector("input");
const cityList = document.querySelector(".city");
const cityName = document.querySelector(".current h2:nth-of-type(2)");
const currentDate = document.querySelector(".current p:nth-of-type(2)");
const currentImg = document.querySelector(".current img");
const currentTemp = document.querySelector(
  ".current .current-weather-left p:nth-of-type(1)"
);
const currentHumidity = document.querySelector(
  ".current .current-weather-left p:nth-of-type(2)"
);
const currentWind = document.querySelector(
  ".current .current-weather-left p:nth-of-type(3)"
);
const currentUvIndex = document.querySelector(
  ".current .current-weather-left p:nth-of-type(4)"
);
const forecastCards = document.querySelectorAll(
  ".forecast .forecast-cards .forecast-card"
);
// add event listener for search button
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // get user input
  const city = searchInput.value.trim();

  // clear search input
  searchInput.value = "";

  // add city to list of recent searches
  const li = document.createElement("li");
  li.textContent = city;
  cityList.prepend(li);

  // get current date
  const now = new Date();
  const today = now.toLocaleDateString();

  // fetch weather data
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ec392f94bc4beb7c327a31bc22a0d5b8&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // set current weather data
      cityName.textContent = data.name;
      currentDate.textContent = new Date().toLocaleDateString();
      currentImg.setAttribute(
        "src",
        `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
      );
      currentImg.setAttribute("alt", data.weather[0].description);
      currentTemp.textContent = `Temperature: ${data.main.temp} °F`;
      currentHumidity.textContent = `Humidity: ${data.main.humidity}%`;
      currentWind.textContent = `Wind Speed: ${data.wind.speed} MPH`;
      // fetch UV index data
      fetch(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=ec392f94bc4beb7c327a31bc22a0d5b8`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          currentUvIndex.textContent = `UV Index: ${data.value}`;
        })
        .catch(function (error) {
          console.log(error);
        });
      // fetch 5-day forecast data
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ec392f94bc4beb7c327a31bc22a0d5b8&units=imperial`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // set forecast data
          for (let i = 0; i < 5; i++) {
            const forecast = data.list[i * 8 + 4];
            const card = forecastCards[i];
            card.querySelector("p:nth-of-type(1)").textContent = new Date(
              forecast.dt_txt
            ).toLocaleDateString();
            card
              .querySelector("img")
              .setAttribute(
                "src",
                `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`
              );
            card
              .querySelector("img")
              .setAttribute("alt", forecast.weather[0].description);
            card.querySelector(
              "p:nth-of-type(2)"
            ).textContent = `Temp: ${forecast.main.temp} °F`;
            card.querySelector(
              "p:nth-of-type(3)"
            ).textContent = `Humidity: ${forecast.main.humidity}%`;
            card.querySelector(
              "p:nth-of-type(4)"
            ).textContent = `Wind Speed: ${forecast.wind.speed} MPH`;
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      // add event listener to city list
      cityList.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
          const city = event.target.textContent;

          // fetch weather data for selected city
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ec392f94bc4beb7c327a31bc22a0d5b8&units=imperial`
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              // set current weather data
              cityName.textContent = data.name;
              currentDate.textContent = new Date().toLocaleDateString();
              currentImg.setAttribute(
                "src",
                `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
              );
              currentImg.setAttribute("alt", data.weather[0].description);
              currentTemp.textContent = `Temperature: ${data.main.temp} °F`;
              currentHumidity.textContent = `Humidity: ${data.main.humidity}%`;
              currentWind.textContent = `Wind Speed: ${data.wind.speed} MPH`;

              // fetch UV index data
              fetch(
                `https://api.openweathermap.org/data/2.5/uvi?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=ec392f94bc4beb7c327a31bc22a0d5b8`
              )
                .then(function (response) {
                  return response.json();
                })
                .then(function (data) {
                  currentUvIndex.textContent = `UV Index: ${data.value}`;
                })
                .catch(function (error) {
                  console.log(error);
                });

              // fetch 5-day forecast data
              fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ec392f94bc4beb7c327a31bc22a0d5b8&units=imperial`
              )
                .then(function (response) {
                  return response.json();
                })
                .then(function (data) {
                  // set forecast data
                  for (let i = 0; i < 5; i++) {
                    const forecast = data.list[i * 8 + 4];
                    const card = forecastCards[i];
                    card.querySelector("p:nth-of-type(1)").textContent =
                      new Date(forecast.dt_txt).toLocaleDateString();
                    card
                      .querySelector("img")
                      .setAttribute(
                        "src",
                        `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`
                      );
                    card
                      .querySelector("img")
                      .setAttribute("alt", forecast.weather[0].description);
                    card.querySelector(
                      "p:nth-of-type(2)"
                    ).textContent = `Temp: ${forecast.main.temp} °F`;
                    card.querySelector(
                      "p:nth-of-type(3)"
                    ).textContent = `Humidity: ${forecast.main.humidity}%`;
                    card.querySelector(
                      "p:nth-of-type(4)"
                    ).textContent = `Wind Speed: ${forecast.wind.speed} MPH`;
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            });
        }
      });
    });
});

const cityButtons = document.querySelectorAll(".city li");

cityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const city = button.textContent;
    fetchWeatherData(city);
  });
});

function fetchWeatherData(city) {
  const apiKey = "ec392f94bc4beb7c327a31bc22a0d5b8";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ec392f94bc4beb7c327a31bc22a0d5b8`
  )
    .then((response) => response.json())
    .then(updateCurrentWeather)
    .catch((error) => console.error("Error fetching weather data:", error));
}

function handleButtonClick(event) {
  event.preventDefault();
  const cityName = event.target.textContent;

  if (cityName) {
    getCurrentWeather(cityName);
    getFiveDayForecast(cityName);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
