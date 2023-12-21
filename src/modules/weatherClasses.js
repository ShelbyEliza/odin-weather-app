import { format } from 'date-fns';
import conditionCodes from './conditions.json';
// console.log(conditionCodes);

function formatDate(dateGiven) {
	let dateArray = dateGiven.split('-');
	let newDate = new Date(
		dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0]
	);

	let formattedDate = format(newDate, 'EEEE-MMMM dd, yyyy').split('-');
	return { dayOfWeek: formattedDate[0], date: formattedDate[1] };
}
function setTheme(themeCode) {
	let condObj = conditionCodes.find(
		(condition) => condition.code === themeCode
	);
	console.log(condObj);
	return condObj.cond;
}

class LocationInfo {
	constructor(data) {
		this.city = data.location.name;
		this.region = data.location.region;
	}
}

class CurrentInfo {
	constructor(current) {
		// console.log(current);
		this.theme = setTheme(current.condition.code);
		this.fullDateObj = formatDate(this.removeTime(current.last_updated));
		this.date = this.fullDateObj.date;
		this.dayOfWeek = this.fullDateObj.dayOfWeek;
		this.temp_C = current.temp_c;
		this.temp_F = current.temp_f;
		this.currentConditionText = current.condition.text;
		this.currentConditionIcon = current.condition.icon;
		this.precip = current.precip_in;
		this.humidity = current.humidity;
		// console.log(this);
	}
	removeTime(date) {
		let regex = /^[\d-]*(?<!\s)/g;
		return date.match(regex)[0];
	}
}

class ForecastInfo {
	constructor(date) {
		let day = date.day;
		// console.log(date);
		this.theme = setTheme(day.condition.code);
		this.fullDateObj = formatDate(date.date);
		this.date = this.fullDateObj.date;
		this.dayOfWeek = this.fullDateObj.dayOfWeek;
		this.maxTemp_C = day.maxtemp_c;
		this.minTemp_C = day.mintemp_c;
		this.maxTemp_F = day.maxtemp_f;
		this.minTemp_F = day.mintemp_f;

		this.avgTemp_C = day.avgtemp_c;
		this.avgTemp_F = day.avgtemp_f;

		this.totalRain = day.totalprecip_in;
		this.totalSnow = day.totalsnow_cm;

		this.rainChance = day.daily_chance_of_rain;
		this.snowChance = day.daily_chance_of_snow;

		this.conditionText = day.condition.text;
		this.conditionIcon = day.condition.icon;
		this.humidity = day.avghumidity;
		console.log(this);
	}
}

export { LocationInfo, CurrentInfo, ForecastInfo };
