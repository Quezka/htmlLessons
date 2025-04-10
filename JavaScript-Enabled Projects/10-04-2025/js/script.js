// Timeout
/*console.log("REQUEST Data");
setTimeout(() => {
	console.log("LOAD Data");

	const data = {
		header: "name",
		payload: "1234",
		sender: "user",
	};

	setTimeout(() => {
		data.dest = "192.168.0.1";
		console.log("Data: ", data);
	}, 2000);
}, 2000);
console.log("FINISH");
*/

// Promise отлавливает состояния
const prom = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log("LOAD Data");

		const data = {
			header: "name",
			payload: "1234",
			sender: "user",
		};

		reject(data);
	}, 2000);
});

prom
	.then((data) => {
		console.log(data);
	})
	.catch((err) => {
		console.error(err);
	})
	.finally(() => {
		console.log("Finally");
	});

// async await = promise, нужен для запросов к БД, fetch и т.д.
const doc = document;

async function loadFromJson() {
	const response = await fetch("./files/operations.json");
	const data = await response.json();
	return data;
}

loadFromJson().then((data) => {
	const ul = doc.getElementById("transactions");
	if (data) {
		for (let i = 0; i < data.length; i++) {
			const li = doc.createElement("li");
			li.className = "trans-item";
			ul.appendChild(li);

			const id = doc.createElement("span");
			id.textContent = `ID: ${data[i]["id"]}`;
			li.appendChild(id);

			const state = doc.createElement("span");
			state.textContent = `State: ${data[i]["state"]}`;
			li.appendChild(state);

			const date = doc.createElement("span");
			date.textContent = `Date: ${data[i]["date"]}`;
			li.appendChild(date);

			const amount = doc.createElement("span");
			amount.textContent = `Amount: ${data[i]["operationAmount"]["amount"]}`;
			li.appendChild(amount);

			const currency = doc.createElement("span");
			amount.appendChild(currency);

			const currencyName = doc.createElement("span");
			currencyName.textContent = ` Name: ${data[i]["operationAmount"]["currency"]["name"]} `;
			currency.appendChild(currencyName);

			const currencyCode = doc.createElement("span");
			currencyCode.textContent = ` Code: ${data[i]["operationAmount"]["currency"]["code"]} `;
			currency.appendChild(currencyCode);

			const desc = doc.createElement("span");
			desc.textContent = `Desc: ${data[i]["description"]}`;
			li.appendChild(desc);

			const from = doc.createElement("span");
			from.textContent = data[i]["from"] != undefined ? `From: ${data[i]["from"]}` : `From: None`;
			li.appendChild(from);

			const to = doc.createElement("span");
			to.textContent = `To: ${data[i]["to"]}`;
			li.appendChild(to);
		}
	}
});

// ##########

function fetchData() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("Данные загружены");
		}, 1000);
	});
}

function processData(data) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(`${data} и обработаны`);
		}, 2000);
	});
}

fetchData()
	.then((data) => {
		console.log(data);
		return processData(data);
	})
	.then((result) => {
		console.log(result);
	})
	.catch((error) => {
		console.error("Произошла ошибка:", error);
	});

// Данные загружены
// Данные загружены и обработаны

// ##################
function fetchUser() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ id: 1, name: "Иван" });
		}, 1000);
	});
}

function fetchPosts(userId) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{ postId: 101, title: "Первый пост" },
				{ postId: 102, title: "Второй пост" },
			]);
		}, 1500);
	});
}

function fetchComments(postId) {
	return new Promise((resolve) => {
		setTimeout(() => {
			const comments = [
				{ commentId: 1, text: "Комментарий 1" },
				{ commentId: 2, text: "Комментарий 2" },
			];
			resolve(comments);
		}, 2000);
	});
}

// Выполнение последовательных задач
fetchUser()
	.then((user) => {
		console.log(`Пользователь: ${user.name}`); // 1
		return fetchPosts(user.id);
	})
	.then((posts) => {
		const postPromises = posts.map((post) => {
			console.log(`Пост: ${post.title}`); // 2, 3
			return fetchComments(post.postId).then((comments) => {
				console.log(`Комментарии к посту "${post.title}":`); // 3, 7
				comments.forEach((comment) => {
					console.log(`- ${comment.text}`); // 4, 5, 8, 9
				});
			});
		});
		return Promise.all(postPromises);
	})
	.then(() => {
		console.log("Все операции завершены."); // 10
	})
	.catch((error) => {
		console.error("Произошла ошибка:", error);
	});
