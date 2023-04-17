/* https://api.openweathermap.org/data/2.5/weather?q={cityname}&appid= */

const container = document.querySelector(".container");
const search = document.querySelector(".search button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const notfound = document.querySelector(".notfound");

search.addEventListener("click", () => {
  const ApiKey = "79d4b5ca095ad8ddcd8605645f25fa13";
  const city = document.querySelector(".search input").value;

  if (city === "") {
    return;
  } else {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") {
          container.style.height = "400px";
          notfound.classList.add("fadeIn");
          notfound.style.display = "block";
          weatherBox.style.display = "none";
          weatherDetails.style.display = "none";
          weatherDetails.classList.remove("fadeIn");
          weatherBox.classList.remove("fadeIn");

          return;
        } else {
          const image = document.querySelector(".weather-box img");
          const temperatura = document.querySelector(
            ".weather-box .temperature"
          );
          const description = document.querySelector(
            ".weather-box .description"
          );
          const wind = document.querySelector(".wind .text span");
          const humidity = document.querySelector(".humidity .text span");

          container.style.height = "600px";
          weatherBox.classList.add("fadeIn");
          weatherDetails.classList.add("fadeIn");
          notfound.style.display = "none";
          weatherBox.style.display = "";
          weatherDetails.style.display = "";
          notfound.classList.remove("fadeIn");

          switch (data.weather[0].main) {
            case "Clouds":
              image.src = "./img/cloud.png";
              break;

            case "Rain":
              image.src = "./img/rain.png";
              break;

            case "Snow":
              image.src = "./img/snow.png";
              break;

            case "Mist":
              image.src = "./img/mist.png";
              break;

            case "Clear":
              image.src = "./img/clear.png";
              break;

            default:
              image.src = "";
          }
          temperatura.innerHTML = `${
            parseInt(data.main.temp) - 273
          }<span>C°</span>`;
          description.innerHTML = `${data.weather[0].description}`;
          wind.innerHTML = `${data.wind.speed}<span>km/h</span>`;
          humidity.innerHTML = `${data.main.humidity}<span>%</span>`;
        }
      });
  }
});
