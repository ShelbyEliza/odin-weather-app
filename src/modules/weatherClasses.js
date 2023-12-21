import { format } from 'date-fns';

/** TODO: stopped at moderate or heavy sleet */
const cloudy = [2, 1003, 1006, 1009, 1135];
const rainy = [
	3, 1030, 1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243,
	1246, 1168, 1171, 1198, 1201,
];
const stormy = [5, 1069, 1072, 1147, 1204];
const snowy = [4, 1066, 1087, 1114, 1117];
const sunny = [0, 1000];

function formatDate(dateGiven) {
	let dateArray = dateGiven.split('-');
	let newDate = new Date(
		dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0]
	);

	let formattedDate = format(newDate, 'EEEE-MMMM dd, yyyy').split('-');
	return { dayOfWeek: formattedDate[0], date: formattedDate[1] };
}

class LocationInfo {
	constructor(data) {
		this.city = data.location.name;
		this.region = data.location.region;
	}
}

class CurrentInfo {
	constructor(current) {
		console.log(current);
		this.fullDateObj = formatDate(this.removeTime(current.last_updated));
		this.date = this.fullDateObj.date;
		this.dayOfWeek = this.fullDateObj.dayOfWeek;
		this.temp_C = current.temp_c;
		this.temp_F = current.temp_f;
		this.currentConditionText = current.condition.text;
		this.currentConditionIcon = current.condition.icon;
		this.precip = current.precip_in;
		this.humidity = current.humidity;
	}
	removeTime(date) {
		let regex = /^[\d-]*(?<!\s)/g;
		return date.match(regex)[0];
	}
	setTheme() {}
}

class ForecastInfo {
	constructor(date) {
		let day = date.day;
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
	}
}

export { LocationInfo, CurrentInfo, ForecastInfo };
