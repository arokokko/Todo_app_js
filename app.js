const tasks = [
	{
		_id: '5d2ca9e2e03d40b326596aa7',
		completed: true,
		body:
			'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
		title: 'Eu ea incididunt sunt consectetur fugiat non.',
	},
	{
		_id: '5d2ca9e29c8a94095c1288e0',
		completed: false,
		body:
			'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
		title:
			'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
	},
	{
		_id: '5d2ca9e2e03d40b3232496aa7',
		completed: true,
		body:
			'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
		title: 'Eu ea incididunt sunt consectetur fugiat non.',
	},
	{
		_id: '5d2ca9e29c8a94095564788e0',
		completed: false,
		body:
			'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
		title:
			'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
	},
];

(function (arrOfTasks) {
	//создаем объект из массива данных
	const objOfTasks = tasks.reduce((acc, task) => {
		acc[task._id] = task;
		return acc;
	}, {});
	// получаем общий контейнер списка дел
	const listContainer = document.querySelector('.tasks-list-section .list-group');
	// получаем форму добавления дел в список и ее элементы
	const form = document.forms['addTask'],
		  formTitle = form.elements['title'],
		  formBody = form.elements['body'];


	renderAllTasks(objOfTasks);
	form.addEventListener('submit', onFormSubmitHandler);

	// функция рендера списка дел на странице
	function renderAllTasks(tasklist) {
		const fragment = document.createDocumentFragment();
		Object.values(tasklist).forEach(task => {
			const liItem = listItemTemplate(task);
			fragment.appendChild(liItem);
		});
		listContainer.appendChild(fragment);
	}

	// функция создания отдельного элемента списка
	function listItemTemplate({_id, title, body}) {
		const li = document.createElement('li');
		li.classList.add(
			'list-group-item', 
			'd-flex', 
			'align-items-center', 
			'flex-wrap', 
			'mt-2'
		);

		const arrInnerLi = [];

		const span = document.createElement('span');
		span.textContent = title;
		span.style.fontWeight = 'bold';
		arrInnerLi.push(span);

		const deleteBtn = document.createElement('button');
		deleteBtn.textContent = 'Delete';
		deleteBtn.classList.add(
			'btn', 
			'btn-danger', 
			'ml-auto', 
			'delete-btn'
		);
		arrInnerLi.push(deleteBtn);

		const article = document.createElement('p');
		article.textContent = body;
		article.classList.add(
			'mt-2',
			'w-100'
		);
		arrInnerLi.push(article);

		arrInnerLi.forEach(item => {
			li.appendChild(item);
		});

		return li;
	}

	// функция обработки формы добавления дел 
	function onFormSubmitHandler(e) {
		e.preventDefault();
		const titleValue = formTitle.value,
			  bodyValue = formBody.value;
		const task = createNewTask(titleValue, bodyValue); 
		const listItem = listItemTemplate(task);
		listContainer.prepend(listItem);
		form.reset();
	}

	//функция создания нового задания
	function createNewTask(title, body) {
		const newTask = {
			title,
			body,
			completed: false,
			_id: `task-${Math.random()}`
		}

		objOfTasks[newTask._id] = newTask;
		
		return {...newTask};
	}

})(tasks);

