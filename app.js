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
    const objOfTasks = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;
    }, {});

    
    const listContainer = document.querySelector('.tasks-list-section .list-group');
    const form = document.forms['addTask'];

    // events
    renderAllTasks(objOfTasks);
    form.addEventListener('submit', onFormSubmitHandler);
    listContainer.addEventListener('click', onDeleteHandler);

    // functions
    function renderAllTasks(tasksList) {
        if(!tasksList) {
            console.error('Pass the argument to the function');
            return;
        }

        const fragment = document.createDocumentFragment();
        Object.values(tasksList).forEach(task => {
            fragment.appendChild(listItemTemplate(task));
        });
        
        listContainer.innerHTML = '';
        listContainer.appendChild(fragment);
    }

    function listItemTemplate({_id, body, title}) {
        
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
        li.setAttribute('data-id', _id);
        li.innerHTML =
            `<h5>${title}</h5>
            <button class="btn btn-danger ml-auto delete-btn">Delete task</button>
            <p class="mt-2 w-100">${body}</p>`;
        return li;
    }

    function onFormSubmitHandler(e) {
        e.preventDefault();
        const formBodyValue = form.elements['body'].value,
            formTitleValue = form.elements['title'].value;

        if(!formBodyValue || !formTitleValue) {
            alert("Please input title and text");
            return;
        }
        
        const newTask = createNewTask(formTitleValue, formBodyValue);
        form.reset();
        objOfTasks[newTask._id] = newTask;
        renderAllTasks(objOfTasks);
    }

    function createNewTask(title, body) {
        const newTask = {
            title,
            body,
            comleted: false,
            _id: `task_${Math.random()}`
        }

        return newTask;
    }

    function onDeleteHandler({target}) {
        if (target.classList.contains('delete-btn')) {
            const id = target.closest('[data-id]').dataset.id;
            delete objOfTasks[id];
            renderAllTasks(objOfTasks);
        }
    }

})(tasks);