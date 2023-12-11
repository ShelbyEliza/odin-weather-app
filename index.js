// import { formatNewDate } from './modules/formatDate.js';
// import { format } from 'date-fns';

import search from './modules/search.js';
import {
	LocationInfo,
	CurrentInfo,
	ForecastInfo,
} from './modules/weatherClasses.js';
import {
	setLocationDOM,
	setCurrentDOM,
	setForecastDOM,
	switchCurrentUnits,
	switchForecastUnits,
} from './modules/setDOM.js';

const searchBtn = document.getElementById('search-btn');
const radioBtns = document.querySelectorAll('input[type=radio]');
const unitEls = Array.from(document.querySelectorAll('.unit'));

let unitSelected = 'fahrenheit';

searchBtn.addEventListener('click', async (e) => {
	e.preventDefault();
	let userQ = search();
	try {
		await performSearch(userQ);
	} catch (err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Something went wrong. Please try again.');
		}
	}
});

radioBtns.forEach((btn) => {
	btn.addEventListener('change', (e) => {
		unitSelected = e.target.value;
		unitEls.forEach((el) => {
			el.textContent = e.target.value[0].toUpperCase();
		});
		switchCurrentUnits(unitSelected, currentInfo);
		switchForecastUnits(unitSelected, forecastInfo);
	});
});

let locale = 'Portland+Oregon';
const base_URL = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=';
const ending_URL = '&days=3';
/** url examples
 * let url = base_URL + locale + ending_URL;
 * const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=London&days=3';
 */

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0c01510325mshae5d0b50424766cp11fc7ajsn7a724e25601f',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
	},
};

async function getWeatherData(location) {
	let url = base_URL + location + ending_URL;
	try {
		const response = await fetch(url, options);
		return await JSON.parse(await response.text());
	} catch (error) {
		console.error(error);
	}
}

async function buildInfo(data) {
	const locationInfo = new LocationInfo(data);
	const currentInfo = new CurrentInfo(data.current);
	const forecastInfo = await setForecastInfo(data.forecast.forecastday);
	return { locationInfo, currentInfo, forecastInfo };
}

async function setForecastInfo(daysData) {
	let forecastInfos = [];

	daysData.forEach((date) => {
		let dayInfo = new ForecastInfo(date);
		forecastInfos.push(dayInfo);
	});

	return forecastInfos;
}

async function performSearch(userQuery) {
	const weatherData = await getWeatherData(userQuery);
	const { locationInfo, currentInfo, forecastInfo } = await buildInfo(
		weatherData
	);
	await setLocationDOM(locationInfo);
	await setCurrentDOM(currentInfo, unitSelected);
	await setForecastDOM(forecastInfo, unitSelected);
}

// const weatherData = await getWeatherData(locale);
// const { locationInfo, currentInfo, forecastInfo } = await buildInfo(
// 	weatherData
// );
// await setLocationDOM(locationInfo);
// await setCurrentDOM(currentInfo, unitSelected);
// await setForecastDOM(forecastInfo, unitSelected);
await setCurrentDOM(
	{
		date: '2023-12-11 11:00',
		temp_C: 9.4,
		temp_F: 48.9,
		currentConditionText: 'Light rain',
		currentConditionIcon: '//cdn.weatherapi.com/weather/64x64/day/296.png',
		precip: 0,
		humidity: 90,
	},
	unitSelected
);

await setLocationDOM({ city: 'Portland', region: 'Oregon' });

// formatNewDate();
