function showUserMessage() {
	alert("Hello! Welcome to my website!");
	return null;
}

class Class {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	showUser = () => {
		if (this.x == 0) {
			return false;
		} else {
			return true;
		}
	};
}
