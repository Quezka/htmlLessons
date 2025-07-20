const doc = document;
const cont = doc.getElementById("tasks");
const editModal = doc.getElementById("edit-task");
const taskEditTitle = doc.getElementById("edit-task-title-input");
const confirmTitleEdit = doc.getElementById("edit-task-title-confirm");
const closeEditModal = doc.getElementById("edit-task-close-modal");

const createTaskModal = doc.getElementById("create-task");
const createTaskModalConfirm = doc.getElementById("create-task-confirm");
const createTaskModalDate = doc.getElementById("create-task-deadline-input");

const url = "http://localhost:3000";
let currentTaskId = 0;

const date = () => {
	const time = new Date();

	return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`;
};

createTaskModalConfirm.addEventListener("click", () => {
	console.log(date());
});

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

const updateTitle = async () => {
	task = await getTask(currentTaskId);
	if (taskEditTitle.value.trim() != "" && taskEditTitle.value != task.title) {
		fetch(`${url}/tasks/${currentTaskId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: taskEditTitle.value.trim(),
				dates: { created_at: task.dates["created_at"], due_date: task.dates["due_date"], completed_at: task.dates["completed_at"], update_date: date() },
			}),
		})
			.then((response) => response.json())
			.then((data) => {});
	} else {
		doc.getElementById("task-title-error-message").className = "error-message shown";
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
				summary.title = task.title;
				details.appendChild(summary);

				/********* Set task Title ************/
				const span = doc.createElement("span");
				span.className = "tasks-item-title";
				summary.appendChild(span);

				const icon = doc.createElement("i");
				icon.className = "fa fa-caret-right";
				icon.title = "Развернуть";
				icon.setAttribute("aria-hidden", "true");
				span.appendChild(icon);

				const taskName = doc.createElement("span");
				taskName.textContent = task.title;
				span.appendChild(taskName);
				/*************************************/

				/******** Set task Buttons ***********/
				const buttonSpan = doc.createElement("span");
				buttonSpan.className = "tasks-item-buttons";
				summary.appendChild(buttonSpan);

				const buttonEdit = doc.createElement("button");
				buttonEdit.className = "tasks-item-buttons-edit icon-button";
				buttonEdit.title = "Изменить";
				buttonEdit.type = "button";
				buttonSpan.appendChild(buttonEdit);
				buttonEdit.id = task.id;
				buttonEdit.addEventListener("click", taskEdit);

				const editIcon = doc.createElement("i");
				editIcon.className = "fa fa-pencil-square-o";
				editIcon.setAttribute("aria-hidden", "true");
				buttonEdit.appendChild(editIcon);

				const buttonDelete = doc.createElement("button");
				buttonDelete.className = "tasks-item-buttons-delete icon-button";
				buttonDelete.id = task.id;
				buttonDelete.title = "Удалить";
				buttonDelete.type = "button";
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
				checkBox.title = "Выполнено";
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

getData();

/* createTaskModal.showModal(); */
