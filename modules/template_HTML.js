const locationTitle = document.getElementById('location');
const currentDate = document.getElementById('current-date');
const currentCond = document.getElementById('current-cond');
const currentTemp = document.getElementById('current-temp');
const currentHumidity = document.getElementById('current-humidity');
const currentDescription = document.getElementById('current-description');

const dateEls = document.querySelectorAll('.f-date');
const averageEls = document.querySelectorAll('.f-avg');
const minEls = document.querySelectorAll('.f-min');
const maxEls = document.querySelectorAll('.f-max');
const rainChanceEls = document.querySelectorAll('.f-rain-chance');
const snowChanceEls = document.querySelectorAll('.f-snow-chance');
const rainTotalEls = document.querySelectorAll('.f-rain-total');
const snowTotalEls = document.querySelectorAll('.f-snow-total');
const humidityEls = document.querySelectorAll('.f-humidity');
const conditionEls = document.querySelectorAll('.f-conditions');

async function setForecast(forecastInfos) {
	let elsObj = {
		dates: Array.from(dateEls),
		avgs: Array.from(averageEls),
		mins: Array.from(minEls),
		maxes: Array.from(maxEls),
		rainChances: Array.from(rainChanceEls),
		snowChances: Array.from(snowChanceEls),
		rainTotals: Array.from(rainTotalEls),
		snowTotals: Array.from(snowTotalEls),
		humidities: Array.from(humidityEls),
		conditions: Array.from(conditionEls),
	};

	for (let i = 0; i < 3; i++) {
		console.log(forecastInfos[i]);
		elsObj.dates[i].textContent = forecastInfos[i].date;
		elsObj.avgs[i].textContent = forecastInfos[i].avgTemp_F;
		elsObj.mins[i].textContent = forecastInfos[i].minTemp_F;
		elsObj.maxes[i].textContent = forecastInfos[i].maxTemp_F;
		elsObj.rainChances[i].textContent = forecastInfos[i].rainChance + '%';
		elsObj.snowChances[i].textContent = forecastInfos[i].snowChance + '%';
		elsObj.rainTotals[i].textContent = forecastInfos[i].totalRain + ' in';
		elsObj.snowTotals[i].textContent = forecastInfos[i].totalSnow + ' in';
		elsObj.conditions[i].src = forecastInfos[i].conditionIcon;
		elsObj.conditions[i].alt = forecastInfos[i].conditionText;
		elsObj.humidities[i].textContent = forecastInfos[i].humidity + '%';
	}
}

async function setLocation(locationInfo) {
	locationTitle.textContent = locationInfo.city + ',' + locationInfo.region;
}

async function setCurrent(currentInfo) {
	currentDate.textContent = currentInfo.date;
	currentCond.src = currentInfo.currentConditionIcon;
	currentCond.alt = currentInfo.currentConditionText;

	currentTemp.textContent = currentInfo.temp_F;
	currentHumidity.textContent = currentInfo.humidity + '%';
	currentDescription.textContent = currentInfo.currentConditionText;
}

export { setLocation, setCurrent, setForecast };
