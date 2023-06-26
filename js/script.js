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
            <li class= "content__item"${task.done ? " class=\"content__done\"" : ""}>
						<button class="content__button content__button--done js-done"> 
						${task.done ? "✔" : ""}</button>
            <button class="content__button content__button--remove js-remove"></button>
						${task.content}
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