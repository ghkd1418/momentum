const API_KEY = "b2e16f1b98b7e7638968b4cc5c760018";

function onGoOk(position) {
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
	fetch(url)
		.then((Response) => Response.json())
		.then((data) => {
			const weather = document.querySelector("#weather span:first-child");
			const cityAndTemp = document.querySelector(
				"#weather span:last-child"
			);
			let weatherData = data.weather[0].main;
			let tempData = Math.round(data.main.temp);

			if (data.name == "Reisui") {
				data.name = "Yeosu";
			}
			cityAndTemp.innerHTML = `${tempData}℃ ${data.name}`;

			const weatherImg = document.createElement("img");

			switch (weatherData) {
				case "Clouds":
					weatherImg.src = `img/cloud.png`;
					break;

				case "Rain":
					weatherImg.src = `img/rain.gif`;
					break;

				case "Snow":
					weatherImg.src = `img/snow.gif`;
					break;

				case "Wind":
					weatherImg.src = `img/wind.gif`;
					break;

				case "Clear":
					weatherImg.src = `img/sun.gif`;
					break;

				case "Thunder":
					weatherImg.src = `img/thunder.gif`;
					break;

				default:
					alert(weatherData);
					break;
			}
			weather.appendChild(weatherImg);
		});
}
function onGoError() {
	alert("Can't find you. No weather for you");
}
navigator.geolocation.getCurrentPosition(onGoOk, onGoError);
