const doc = document;

/*
Дана строка let input = " Hello, my NAME is John! ".
Очисти пробелы по краям, замени "John" на "Mike", и проверь, содержит ли результат слово "mike" (без учёта регистра).
*/
const func = () => {
	let input = " Hello, my NAME is John! ";
	let res = input.trim().replace("John", "Mike").toLowerCase().includes("mike");
	alert(`Result: ${res}`);
};

/*
В строке let text = " Apples, Bananas, and Cherries " посчитай количество слов, приведя строку к нижнему регистру и разделив по пробелам.
*/
const func1 = () => {
	let text = " Apples, Bananas, and Cherries ";
	let res = text.trim().toLowerCase().split(" ").length;
	alert(`Array length: ${res}`);
};

/*
Из строки let comment = " This is a BAD comment " удали пробелы, замени "BAD" на "good", и проверь, начинается ли строка со слова "This".
*/
const func2 = () => {
	let comment = " This is a BAD comment ";
	let res = comment.trim().replace("BAD", "good").indexOf("This") == 0 ? true : false;
	alert(`Result: ${res}`);
};

/*
Из массива объектов с ценами достань только активные, затем вытащи их значения и посчитай
*/
const func4 = () => {
	let items = [
		{ price: 100, active: true },
		{ price: 50, active: false },
		{ price: 75, active: true },
	];

	let res = items
		.filter((i) => i.active)
		.map((i) => i.price)
		.reduce((tempSum, i) => tempSum + i, 0);
	alert(`Summ: ${res}`);
};

/*
Удали все пустые строки из массива, приведи оставшиеся к нижнему регистру и посчитай их количество.
let words = ["Hello", "", "WORLD", " ", "JavaScript", ""];
*/
const func5 = () => {
	let words = ["Hello", "", "WORLD", " ", "JavaScript", ""];
	let res = words
		.map((i) => i.trim())
		.filter((i) => i.length > 0)
		.map((i) => i.toLowerCase()).length;
	alert(`Array element qty: ${res}`);
};

/*
Удали все отрицательные числа, затем удвой оставшиеся и найди их сумму.
let nums = [-2, 3, -1, 4, 0];
// */
const func6 = () => {
	let nums = [-2, 3, -1, 4, 0];
	let res = nums
		.filter((i) => i >= 0)
		.map((i) => i * 2)
		.reduce((tempSum, i) => tempSum + i, 0);
	alert(`Final: ${res}`);
};

/*
Раздели строку тегов, удали пустые, приведи к верхнему регистру и выведи длину каждого.
let input = "html, css, , js, react";
*/
const func7 = () => {
	let input = "html, css, , js, react";
	let res = input
		.split(",")
		.map((i) => i.trim())
		.filter((i) => i.length > 0)
		.map((i) => i.toUpperCase().length);
	alert(`Lenghts: ${res}`);
};

/*
Удали первый элемент массива, добавьте новый в конец и проверьте, содержит ли массив "banana".
let fruits = ["apple", "banana", "cherry"];
*/
const func8 = () => {
	let fruits = ["apple", "banana", "cherry"];
	fruits.shift();
	fruits.push("melon");
	let res = fruits.includes("banana");
	alert(`Result: ${res}, Fruits: ${fruits}`);
};

// Filter with return
const func9 = () => {
	let users = [
		{ name: "Alice", age: 25, isActive: true },
		{ name: "bob", age: 30, isActive: true },
		{ name: "Alex", age: 17, isActive: true },
		{ name: "Anna", age: 22, isActive: true },
		{ name: "Andrew", age: 19, isActive: false },
		{ name: "Charlie", age: 20, isActive: true },
	];

	let filteredUsers = users.filter((user) => {
		return user.age > 18 && user.isActive === true;
	});
	alert(`Filtered Users: ${filteredUsers.map((i) => i.name)}`);
};
