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

    const themes = {
        default: {
          '--base-text-color': '#212529',
          '--header-bg': '#007bff',
          '--header-text-color': '#fff',
          '--default-btn-bg': '#007bff',
          '--default-btn-text-color': '#fff',
          '--default-btn-hover-bg': '#0069d9',
          '--default-btn-border-color': '#0069d9',
          '--danger-btn-bg': '#dc3545',
          '--danger-btn-text-color': '#fff',
          '--danger-btn-hover-bg': '#bd2130',
          '--danger-btn-border-color': '#dc3545',
          '--input-border-color': '#ced4da',
          '--input-bg-color': '#fff',
          '--input-text-color': '#495057',
          '--input-focus-bg-color': '#fff',
          '--input-focus-text-color': '#495057',
          '--input-focus-border-color': '#80bdff',
          '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
        },
        dark: {
          '--base-text-color': '#212529',
          '--header-bg': '#343a40',
          '--header-text-color': '#fff',
          '--default-btn-bg': '#58616b',
          '--default-btn-text-color': '#fff',
          '--default-btn-hover-bg': '#292d31',
          '--default-btn-border-color': '#343a40',
          '--default-btn-focus-box-shadow':
            '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
          '--danger-btn-bg': '#b52d3a',
          '--danger-btn-text-color': '#fff',
          '--danger-btn-hover-bg': '#88222c',
          '--danger-btn-border-color': '#88222c',
          '--input-border-color': '#ced4da',
          '--input-bg-color': '#fff',
          '--input-text-color': '#495057',
          '--input-focus-bg-color': '#fff',
          '--input-focus-text-color': '#495057',
          '--input-focus-border-color': '#78818a',
          '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        },
        light: {
          '--base-text-color': '#212529',
          '--header-bg': '#fff',
          '--header-text-color': '#212529',
          '--default-btn-bg': '#fff',
          '--default-btn-text-color': '#212529',
          '--default-btn-hover-bg': '#e8e7e7',
          '--default-btn-border-color': '#343a40',
          '--default-btn-focus-box-shadow':
            '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
          '--danger-btn-bg': '#f1b5bb',
          '--danger-btn-text-color': '#212529',
          '--danger-btn-hover-bg': '#ef808a',
          '--danger-btn-border-color': '#e2818a',
          '--input-border-color': '#ced4da',
          '--input-bg-color': '#fff',
          '--input-text-color': '#495057',
          '--input-focus-bg-color': '#fff',
          '--input-focus-text-color': '#495057',
          '--input-focus-border-color': '#78818a',
          '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        },
    };

    let showOnlyCompleted = false;
    let lastSelectedTheme = localStorage.getItem('app-theme') || 'default';
    
    const listContainer = document.querySelector('.tasks-list-section .list-group');
    const form = document.forms['addTask'];
    const btnsList = document.querySelector('.buttons-list');
    const themeSelect = document.querySelector('#themeSelect');

    // events
    setTheme(lastSelectedTheme);
    setValueNavbar();
    renderAllTasks(objOfTasks);
    form.addEventListener('submit', onFormSubmitHandler);
    listContainer.addEventListener('click', onDeleteHandler);
    listContainer.addEventListener('click', onCompleteHandler);
    btnsList.addEventListener('click', onShowingTasksHandler);
    themeSelect.addEventListener('change', onThemeSelectHandler);

    // functions

    // handler buttons show all tasks and show not completed tasks
    function onShowingTasksHandler({target}) {
        if (target.classList.contains('not-completed-tasks')) {
            showOnlyCompleted = true;
        } else if (target.classList.contains('all-tasks')) {
            showOnlyCompleted = false;
        }
        renderAllTasks(objOfTasks);
    }

    // sort array of tasks 
    function sortByField(field) {
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }
    

    function renderAllTasks(tasksList) {

        const fragment = document.createDocumentFragment();
        const sortedArrayFromObject = Object.values(tasksList).sort(sortByField('completed'));
        let arrayOfTasks = showOnlyCompleted ? sortedArrayFromObject.filter(item => !item.completed) : sortedArrayFromObject;
        
        if (!arrayOfTasks.length) {
            fragment.appendChild(messageNoTasks());
        } else {
            arrayOfTasks.forEach(task => {
                fragment.appendChild(listItemTemplate(task));
            });
        }
        
        listContainer.innerHTML = '';
        listContainer.appendChild(fragment);
    }

    // generate message when no tasks
    function messageNoTasks() {
        const li = document.createElement('li');

        li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
        li.innerHTML = `<p class="mt-2 w-100">There are no tasks</p>`;

        return li;
    }

    // generate separate tasks
    function listItemTemplate({_id, body, completed, title}) {
        const li = document.createElement('li');

        li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
        li.setAttribute('data-id', _id);
        li.innerHTML = 
            `<h5>${title}</h5>
            <button class="btn btn-danger ml-auto delete-btn">Delete task</button>`;

        // checking completed task or not
        if (!completed) {
            li.innerHTML +=
                `<p class="mt-2 w-100">${body}</p>   
                <button class="btn btn-info ml-auto complete-btn">Mark as completed</button>`; 
        } else {
            li.innerHTML +=
                `<p class="mt-2 w-100" style="text-decoration:line-through">${body}</p>   
                <button class="btn btn-info ml-auto complete-btn">Recover task</button>`;
        }
        
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
            completed: false,
            _id: `task_${Math.random()}`
        }

        return newTask;
    }

    // handler button delete task
    function onDeleteHandler({target}) {
        if (target.classList.contains('delete-btn')) {
            const id = target.closest('[data-id]').dataset.id;
            delete objOfTasks[id];
            renderAllTasks(objOfTasks);
        }
    }

    // handler button complete task
    function onCompleteHandler({target}) {
        if (target.classList.contains('complete-btn')) {
            const id = target.closest('[data-id]').dataset.id;
            objOfTasks[id].completed = !objOfTasks[id].completed;
            renderAllTasks(objOfTasks);
        }
    }

    // handler select theme
    function onThemeSelectHandler() {
        const selectedTheme = themeSelect.value;
        setTheme(selectedTheme);
        localStorage.setItem("app-theme", selectedTheme);
        lastSelectedTheme = selectedTheme;
    }

    function setTheme(theme) {
        const selectedThemeObject = themes[theme];
        Object.entries(selectedThemeObject).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    }

    function setValueNavbar() {
        themeSelect.value = lastSelectedTheme;
    }

})(tasks);