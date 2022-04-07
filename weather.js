const API_KEY = "b2e16f1b98b7e7638968b4cc5c760018";

function onGoOk(position) {
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
	fetch(url)
		.then((Response) => Response.json())
		.then((data) => {
			const weather = document.querySelector("#weather span:first-child");
			const city = document.querySelector("#weather span:last-child");
			weather.innerHTML = `${data.weather[0].main} / ${data.main.temp}℃`;
			city.innerText = data.name;
		});
}
function onGoError() {
	alert("Can't find you. No weather for you");
}
navigator.geolocation.getCurrentPosition(onGoOk, onGoError);

//추가
// 날씨에 따라 날씨에 따라 아이콘 삽입
