{
	const tasks = [
		{
			content: "odebrać dziecko z przedszkola",
			done: false,
		},
		{
			content: "zjeść obiad",
			done: true,
		},
	];

	const addNewTask = (newTaskContent) => {
		tasks.push({
			content: newTaskContent,
		});

		render();
	};

	const removeTask = (index) => {
		tasks.splice(index, 1);

		render();
	}

	const toggleTaskDone = (index) => {
		tasks[index].done = !tasks[index].done;

		render();
	}

	const bindEvents = () => {
		const toggleDoneButtons = document.querySelectorAll(".js-done");

		toggleDoneButtons.forEach((toggleDoneButton, index) => {
			toggleDoneButton.addEventListener("click", () => {
				toggleTaskDone(index);
			});
		});

		const removeButtons = document.querySelectorAll(".js-remove");

		removeButtons.forEach((removeButton, index) => {
			removeButton.addEventListener("click", () => {
				removeTask(index);
			});
		});
	}

	const render = () => {
		let htmlString = "";

		for (const task of tasks) {
			htmlString += `
            <li class="content__item">
						<button class="content__buttonDone js-done"> ${task.done ? "✔" : ""}</button>
            <span class="${task.done ? "content__item--done" : ""}"> ${task.content} </span>
						<button class="content__buttonRemove js-remove"></button>
						</li>
            `;
		};

		document.querySelector(".js-tasks").innerHTML = htmlString;

		bindEvents();
	};



	const onFormSubmit = (event) => {
		event.preventDefault();

		const newTaskContent = document.querySelector(".js-newTask").value.trim();

		if (newTaskContent === "") {
			return;
		}


		addNewTask(newTaskContent);
	};

	const init = () => {
		render();

		const form = document.querySelector(".js-form");

		form.addEventListener("submit", onFormSubmit);
	};
	init();
}