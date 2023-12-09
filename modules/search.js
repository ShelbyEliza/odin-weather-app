const inputEl = document.getElementById('user-locale');

export default function search() {
	let input = inputEl.value;
	try {
		if (input !== '') {
			let reg = /\S[a-z|A-Z]*\b/g;

			return input.match(reg).join(' + ');
		} else {
			console.log('Invalid entry. Try again.');
		}
	} catch (err) {
		console.log(err);
	}
}
