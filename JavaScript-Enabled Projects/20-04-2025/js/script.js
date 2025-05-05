const doc = document;
const cont = doc.getElementById("tasks");
const editModal = doc.getElementById("create-task");
const taskEditTitle = doc.getElementById("create-task-title-input");
const confirmTitleEdit = doc.getElementById("create-task-title-confirm");
const closeEditModal = doc.getElementById("create-task-close-modal");
const url = "http://localhost:3000";
let currentTaskId = 0;

const enumerateDates = (i) => {
	const list = ["Создана: ", "До: ", "Выполнена: ", "Обновлена: "];
	return list[i];
};

const taskEdit = async (event) => {
	currentTaskId = event.currentTarget.id;
	const task = await getTask(currentTaskId);
	taskEditTitle.value = task.title;
	editModal.showModal();
};

const getTask = async (id) => {
	try {
		const resp = await fetch(`${url}/tasks/${id}`);
		const data = await resp.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

const deleteTask = (event) => {
	fetch(`${url}/tasks/${event.currentTarget.id}`, {
		method: "DELETE",
	}).then((response) => {
		console.log(response);
	});
};

const closeModal = () => {
	console.log("closemodal");
	editModal.close();
};
closeEditModal.addEventListener("click", closeModal);

const updateTitle = () => {
	if (taskEditTitle.value.trim() != "") {
		fetch(`${url}/tasks/${currentTaskId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: taskEditTitle.value.trim(),
			}),
		})
			.then((response) => response.json())
			.then((data) => {});
	} else {
		doc.getElementById("error-message").className = "error-message shown";
	}
};
confirmTitleEdit.addEventListener("click", updateTitle);

const getData = () => {
	fetch(`${url}/tasks`)
		.then((response) => response.json())
		.then((data) => {
			data.forEach((task) => {
				const details = doc.createElement("details");
				details.className = "tasks-item";
				cont.appendChild(details);

				const summary = doc.createElement("summary");
				summary.className = "tasks-item-summary";
				details.appendChild(summary);

				/********* Set task Title ************/
				const span = doc.createElement("span");
				span.className = "tasks-item-title";
				summary.appendChild(span);

				const icon = doc.createElement("i");
				icon.className = "fa fa-caret-right";
				icon.setAttribute("aria-hidden", "true");
				span.appendChild(icon);

				const taskName = doc.createElement("span");
				taskName.textContent = task.title;
				span.appendChild(taskName);

				const buttonSpan = doc.createElement("span");
				buttonSpan.className = "tasks-item-buttons";
				summary.appendChild(buttonSpan);

				const buttonEdit = doc.createElement("button");
				buttonEdit.className = "tasks-item-buttons-edit";
				buttonSpan.appendChild(buttonEdit);
				buttonEdit.id = task.id;
				buttonEdit.addEventListener("click", taskEdit);

				const editIcon = doc.createElement("i");
				editIcon.className = "fa fa-pencil-square-o";
				editIcon.setAttribute("aria-hidden", "true");
				buttonEdit.appendChild(editIcon);

				const buttonDelete = doc.createElement("button");
				buttonDelete.className = "tasks-item-buttons-delete";
				buttonDelete.id = task.id;
				buttonSpan.appendChild(buttonDelete);
				buttonDelete.addEventListener("click", deleteTask);

				const deleteIcon = doc.createElement("i");
				deleteIcon.className = "fa fa-window-close-o";
				deleteIcon.setAttribute("aria-hidden", "true");
				buttonDelete.appendChild(deleteIcon);

				const checkBox = doc.createElement("input");
				checkBox.type = "checkbox";
				checkBox.className = "tasks-item-buttons-done";
				checkBox.id = `task-${task.id}`;
				buttonSpan.appendChild(checkBox);
				/***************************************/

				/********* Set task Dates **************/
				const dateList = doc.createElement("div");
				dateList.className = "tasks-item-dates";
				if (task.dates) {
					if (Object.keys(task.dates).length > 0) {
						Object.keys(task.dates).forEach((key, i) => {
							const span = doc.createElement("span");
							if (task.dates[key] != null) {
								span.textContent = enumerateDates(i) + task.dates[key];
							} else {
								span.textContent = "Не Установлено";
							}
							dateList.appendChild(span);
						});
					}
				}
				details.appendChild(dateList);
				/***************************************/

				/********* Set task Comment ************/
				const commentList = doc.createElement("ul");
				commentList.className = "tasks-item-comments";
				if (task.comments) {
					if (task.comments.length > 0) {
						task.comments.forEach((comment) => {
							const commentElement = doc.createElement("li");
							commentElement.textContent = comment;
							commentElement.className = "tasks-item-comments-comment";
							commentList.appendChild(commentElement);
						});
					} else {
						const commentElement = doc.createElement("li");
						commentElement.textContent = "Без Комментариев";
						commentElement.className = "tasks-item-comments-comment";
						commentList.appendChild(commentElement);
					}
				}
				details.appendChild(commentList);
				/***************************************/
			});
		});
};

const getComments = () => {
	fetch(`${url}/tasks/1`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data.comments);
		})
		.catch((error) => {
			console.error(error);
		});
};

getComments();

getData();
