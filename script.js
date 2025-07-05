// script.js

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const country = document.getElementById("countryCode").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city || !country) {
    resultDiv.innerHTML = `<p style="color: red;">Please enter both city and country code.</p>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found or invalid country code.");
      }
      return response.json();
    })
    .then(data => {
      const { name } = data;
      const { temp, feels_like, humidity } = data.main;
      const { icon, description } = data.weather[0];
      const rain = data.rain ? data.rain["1h"] : 0;

      resultDiv.innerHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Feels Like:</strong> ${feels_like} °C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Rain (last 1hr):</strong> ${rain} mm</p>
        <p><strong>Condition:</strong> ${description}</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
}
