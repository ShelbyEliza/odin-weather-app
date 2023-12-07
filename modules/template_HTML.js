const display = document.getElementById('display');
const locationTitle = document.getElementById('location');

function setLocation(locationInfo) {
	locationTitle.textContent = locationInfo.city + ',' + locationInfo.region;
}

export { setLocation };
