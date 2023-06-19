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

	const render = () => {
		let htmlString = "";

		for (const task of tasks) {
			htmlString += `
            <li${task.done ? " class=\"contentDone\"" : ""}>
						<button class="js-done">zrobione</button>
            <button class="js-remove">usuń</button>
						${task.content}
            </li>
            `;
		};

		document.querySelector(".js-tasks").innerHTML = htmlString;

		const toggleDoneButtons = document.querySelectorAll(".js-done");

		toggleDoneButtons.forEach((toggleDoneButton, index) =>{
			toggleDoneButton.addEventListener("click", () => {
				toggleTaskDone(index);
			});
		});

		const removeButtons = document.querySelectorAll(".js-remove");

		removeButtons.forEach((removeButton, index) =>{
			removeButton.addEventListener("click", () => {
				removeTask(index);
			});
		});
	};

	

	const onFormSubmit = (event) => {
		event.preventDefault();

		const newTaskContent = document.querySelector(".js-newTask").value.trim();

		if(newTaskContent === "") {
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