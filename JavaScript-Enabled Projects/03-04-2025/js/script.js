let doc = document;

let func = () => {
	let arr = [1, 2, 3, 4];

	// Map
	let arr1 = arr.map((i) => i * 2);
	alert(arr1);

	// ForEach
	arr1.forEach((element) => {
		element *= 10;
	});
	alert(arr1);

	// Filtering
	let tempArr = arr.filter((i) => i >= 3);
	alert(tempArr);

	// Reduce, allows to do different things with array elements
	let summ = arr.reduce((tempSumm, i) => tempSumm + i, 0);
	alert(`Array Summ: ${summ}`);
};
