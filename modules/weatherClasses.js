// CurrentInfo("data.current")
// ForecastInfo("data.forecast.day")

class LocationInfo {
	constructor(data) {
		this.city = data.location.name;
		this.region = data.location.region;
	}
}

class CurrentInfo {
	constructor(current) {
		this.date = current.last_updated;
		this.temp_C = current.temp_c;
		this.temp_F = current.temp_f;
		this.currentConditionText = current.condition.text;
		this.currentConditonIcon = current.condition.icon;
		this.precip = current.precip_in;
		this.humidity = current.humidity;
	}
}

class ForecastInfo {
	constructor(date) {
		let day = date.day;
		this.date = date.date;
		this.maxTemp_C = day.maxtemp_c;
		this.minTemp_C = day.mintemp_c;
		this.maxTemp_F = day.maxtemp_f;
		this.minTemp_F = day.mintemp_f;

		this.avgTemp_C = day.avgtemp_c;
		this.avgTemp_F = day.avgtemp_f;

		this.totalPrecip = day.totalprecip_in;
		this.totalSnow = day.totalsnow_cm;

		this.rainChance = day.daily_chance_of_rain;
		this.snowChance = day.daily_chance_of_snow;

		this.conditionText = day.condition.text;
		this.conditionIcon = day.condition.icon;
	}
}

export { LocationInfo, CurrentInfo, ForecastInfo };
