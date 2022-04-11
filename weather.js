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

			// create cloud icon
			function cloudIcon() {
				const weatherImg = document.createElement("img");
				weatherImg.src = `img/cloud.png`;
				weather.appendChild(weatherImg);
			}

			switch (weatherData) {
				case "Clouds":
					cloudIcon();
					break;

				case "rain":
					weather.innerHTML = `비`;
					break;

				case "snow":
					weather.innerHTML = `눈`;
					break;

				case "wind":
					weather.innerHTML = `바람`;
					break;

				default:
					break;
			}
		});
}
function onGoError() {
	alert("Can't find you. No weather for you");
}
navigator.geolocation.getCurrentPosition(onGoOk, onGoError);

//추가
// 날씨에 따라 날씨에 따라 아이콘 삽입 (진행중..)
