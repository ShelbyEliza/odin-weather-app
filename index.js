let locale = 'Portland+maine';
const base_URL = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=';
const ending_URL = '&days=3';
let url = base_URL + locale + ending_URL;
// const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=London&days=3';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0c01510325mshae5d0b50424766cp11fc7ajsn7a724e25601f',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
	},
};

// async function getForecast(location) {
// 	let url = base_URL + location + ending_URL;
// 	try {
// 		const response = await fetch(url, options);
// 		const result = await response.text();
// 		console.log(result);
// 	} catch (error) {
// 		console.error(error);
// 	}
// }
// getForecast(locale);
