import search from './modules/search.js';
import {
	LocationInfo,
	CurrentInfo,
	ForecastInfo,
} from './modules/weatherClasses.js';
import {
	setLocation,
	setCurrent,
	setForecast,
} from './modules/template_HTML.js';

const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', (e) => {
	e.preventDefault();
	search();
});

let locale = 'Portland+oregon';
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
	console.log(data);
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
async function logInfo(weather, current, forecast) {
	console.log({ weather, current, forecast });
}

// const weatherData = await getWeatherData(locale);
// const { locationInfo, currentInfo, forecastInfo } = await buildInfo(
// 	weatherData
// );
// await logInfo(locationInfo, currentInfo, forecastInfo);
// await setLocation(locationInfo);
// await setCurrent(currentInfo);
// await setForecast(forecastInfo);
