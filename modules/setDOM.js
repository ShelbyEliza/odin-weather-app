const locationTitle = document.getElementById('location');
const currentDate = document.getElementById('current-date');
const currentCond = document.getElementById('current-cond');
const currentTemp = document.getElementById('current-temp');
const currentHumidity = document.getElementById('current-humidity');
const currentDescription = document.getElementById('current-description');

let elsObj = {
	dates: Array.from(document.querySelectorAll('.f-date')),
	avgs: Array.from(document.querySelectorAll('.f-avg')),
	mins: Array.from(document.querySelectorAll('.f-min')),
	maxes: Array.from(document.querySelectorAll('.f-max')),
	rainChances: Array.from(document.querySelectorAll('.f-rain-chance')),
	snowChances: Array.from(document.querySelectorAll('.f-snow-chance')),
	rainTotals: Array.from(document.querySelectorAll('.f-rain-total')),
	snowTotals: Array.from(document.querySelectorAll('.f-snow-total')),
	humidities: Array.from(document.querySelectorAll('.f-humidity')),
	conditions: Array.from(document.querySelectorAll('.f-conditions')),
};

async function setLocationDOM(locationInfo) {
	locationTitle.textContent = locationInfo.city + ', ' + locationInfo.region;
}

async function setCurrentDOM(currentInfo, unitSelected) {
	currentDate.textContent = currentInfo.date;
	currentCond.src = currentInfo.currentConditionIcon;
	currentCond.alt = currentInfo.currentConditionText;
	switchCurrentUnits(unitSelected, currentInfo);

	currentHumidity.textContent = currentInfo.humidity + '%';
	currentDescription.textContent = currentInfo.currentConditionText;
}

async function setForecastDOM(forecastInfos, unitSelected) {
	for (let i = 0; i < 3; i++) {
		elsObj.dates[i].textContent = forecastInfos[i].date;
		switchForecastUnits(unitSelected, forecastInfos);

		elsObj.rainChances[i].textContent = forecastInfos[i].rainChance + '%';
		elsObj.snowChances[i].textContent = forecastInfos[i].snowChance + '%';
		elsObj.rainTotals[i].textContent = forecastInfos[i].totalRain + ' in';
		elsObj.snowTotals[i].textContent = forecastInfos[i].totalSnow + ' in';
		elsObj.conditions[i].src = forecastInfos[i].conditionIcon;
		elsObj.conditions[i].alt = forecastInfos[i].conditionText;
		elsObj.humidities[i].textContent = forecastInfos[i].humidity + '%';
	}
}

async function switchForecastUnits(unitSelected, forecastInfos) {
	for (let i = 0; i < 3; i++) {
		if (unitSelected === 'fahrenheit') {
			elsObj.avgs[i].textContent = forecastInfos[i].avgTemp_F;
			elsObj.mins[i].textContent = forecastInfos[i].minTemp_F;
			elsObj.maxes[i].textContent = forecastInfos[i].maxTemp_F;
		} else {
			elsObj.avgs[i].textContent = forecastInfos[i].avgTemp_C;
			elsObj.mins[i].textContent = forecastInfos[i].minTemp_C;
			elsObj.maxes[i].textContent = forecastInfos[i].maxTemp_C;
		}
	}
}

async function switchCurrentUnits(unitSelected, currentInfo) {
	if (unitSelected === 'fahrenheit') {
		currentTemp.textContent = currentInfo.temp_F;
	} else {
		currentTemp.textContent = currentInfo.temp_C;
	}
}

export {
	setLocationDOM,
	setCurrentDOM,
	setForecastDOM,
	switchCurrentUnits,
	switchForecastUnits,
};
