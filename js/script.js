{
	let tasks = [];

	let hideDoneTasks = false;

	const removeTask = (index) => {
		tasks = [
			...tasks.slice(0, index),
			...tasks.slice(index + 1),
		]

		render();
	}
	
	const toggleTaskDone = (index) => {
		tasks = tasks.map(
			(task, indexTask) => index === indexTask ? { ...task, done: !task.done } : task);
		render();
	}

	const toggleHideDoneTasks = () => {
		hideDoneTasks = !hideDoneTasks;
		render();
	}

	const toggleDoneAllTasks = () => {
		tasks = tasks.map((task) => ({ ...task, done: true, }));
		render();
	}

	const render = () => {
		renderTasks();
		renderButtons();
		bindToggleDoneEvents();
		bindRemoveEvents();
		bindButtonEvents();
	}

	const bindToggleDoneEvents = () => {
		const toggleDoneButtons = document.querySelectorAll(".js-done");

		toggleDoneButtons.forEach((toggleDoneButton, index) => {
			toggleDoneButton.addEventListener("click", () => {
				toggleTaskDone(index);
			});
		});
	}

	const bindRemoveEvents = () => {
		const removeButtons = document.querySelectorAll(".js-remove");

		removeButtons.forEach((removeButton, index) => {
			removeButton.addEventListener("click", () => {
				removeTask(index);
			});
		});
	}

	const bindButtonEvents = () => {
		const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");
		if (hideDoneTasksButton) {
			hideDoneTasksButton.addEventListener("click", toggleHideDoneTasks)
		};

		const endAllTasksButton = document.querySelector(".js-endTasks");
		if (endAllTasksButton) {
			endAllTasksButton.addEventListener("click", toggleDoneAllTasks);
		}
	}

	const renderButtons = () => {
		let htmlStringButtons = "";

		if (tasks.length > 0) {
			htmlStringButtons += `
			<span>
				<button class="content__buttonTasks js-hideDoneTasks"> 
					${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone  
				</button>
				<button class="content__buttonTasks js-endTasks"
				${tasks.every(({ done }) => done) ? "disabled" : ""}> 
					Ukończ wszystkie
				</button>
			</span>
		`
		};
		document.querySelector(".js-buttons").innerHTML = htmlStringButtons;
	};

	const renderTasks = () => {
		let htmlStringTasks = "";

		for (const task of tasks) {
			htmlStringTasks += `
      		<li class="content__item
	  		${hideDoneTasks && task.done ? "content__item--hidden" : ""}">
				<button class="content__buttonDone js-done"> 
			 		${task.done ? "✔" : ""}
				</button>
        		<span class="${task.done ? "content__item--done" : ""}"> 
			 		${task.content} 
				</span>
				<button class="content__buttonRemove js-remove">
				</button>
			</li>
            `;
		};
		document.querySelector(".js-tasks").innerHTML = htmlStringTasks;
	};

	const addNewTask = (newTaskContent) => {
		tasks = [
			...tasks,
			{ content: newTaskContent, },
		]
		render();
	}

	const onFormSubmit = (event) => {
		event.preventDefault();

		const newTaskInput = document.querySelector(".js-newTask");
		const newTaskContent = newTaskInput.value.trim();
		if (newTaskContent !== "") {
			addNewTask(newTaskContent);
		}
		newTaskInput.value = "";
		newTaskInput.focus();
	};

	const init = () => {
		render();

		const form = document.querySelector(".js-form");

		form.addEventListener("submit", onFormSubmit);
	};

	init();
}