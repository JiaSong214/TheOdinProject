//constructor function
function ToDo (title, description, dueDate, today, priority, checked, project) {
  this.id = handleData.getTodoObj().length + 1,
  this.title = title,
  this.description = description,
  this.dueDate = dueDate,
  this.today = today,
  this.priority = priority,
  this.checked = checked,
  this.project = project
}

function Project (title) {
  this.id = handleProjectData.getProjectObj().length + 1,
  this.title = title
}


const handleData = (() => {
  let todoObj = [
    {
      id: 1,
      title: 'Make a To Do List',
      description: ['Create CRUD', 'Connect to Memory'],
      dueDate: '2020-09-29',
      today: true,
      priority: true,
      checked: false
    },
    {
      id: 2,
      title: 'Clean the House',
      description: '',
      dueDate: '',
      today: false,
      priority: false,
      checked: true
    },
    {
      id: 3,
      title: 'Check new properties',
      description: '',
      dueDate: '',
      today: true,
      priority: false,
      checked: false
    }
  ];

  const getTodoObj = () => {
    return todoObj;
  }

  const addTodo = (newTodo) => {
    todoObj.push(newTodo);
  }

  const deleteTodo = (id) => {
    const newTodoObj = todoObj.filter(todo => todo.id !== id);
    todoObj = newTodoObj;

    handleDOM.renderAllTodos();
  }

  const editTodo = (modifiedTodo) => {
    todoObj = modifiedTodo;

    handleDOM.renderAllTodos();
    // handleDOM.renderInfo();
  }

  return { 
    getTodoObj,
    addTodo,
    deleteTodo,
    editTodo
  };
})();


const handleProjectData = (() => {
  let projectObj = [
    {
      id: 1,
      title: 'Study'
    },
    {
      id: 2,
      title: 'Shopping'
    }
  ];

  const addProject = (newProjectTitle) => {
    projectObj.push(newProjectTitle);
  }

  const deleteProject = (id) => {
    const newProjectObj = projectObj.filter(project => project.id !== id);
    projectObj = newProjectObj;

    handleDOM.renderProjectList();
  }

  const changeProjectName = () => {

  }

  const getProjectObj = () => {
    return projectObj;
  }

  return {
    getProjectObj,
    addProject,
    deleteProject,
    changeProjectName
  }
})();

const handleProjectForm = (() => {
  const projectAddForm = document.querySelector('.project__addForm');

  const submitProject = (e) => {
    e.preventDefault();
    const projectAddInput = document.querySelector('.project__addForm__input');
    const newProjectTitle = projectAddInput.value;
    handleProjectData.addProject(new Project(newProjectTitle));
    handleDOM.renderProjectList();
    projectAddInput.value = '';
  }

  projectAddForm.addEventListener('submit', submitProject);
})();

handleProjectForm;


const handleForm = (() => {
  const todoListAddBtn = document.querySelector('.todo__list__addBtn');
  const headerAddBtn = document.querySelector('.header__addBtn');
  const addFormOverlay = document.querySelector('.addForm-overlay');
  const addForm = document.querySelector('.addForm');

  const date = new Date();
  const defaultDate = document.querySelector('input[type="date"]');
  defaultDate.value = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  const openAddTodoForm = () => {
    addFormOverlay.classList.add('active');
    addForm.classList.add('active');
  };
  
  const closeAddTodoForm = () => {
    addFormOverlay.classList.remove('active');
    addForm.classList.remove('active');
  };

  const submitTodoForm = (e) => {
    e.preventDefault();

    const addFormTitle = document.querySelector('.addForm__input');
    const addFormDate = document.querySelector('.addForm__moreInfo__date');
    const addFormToday = document.querySelector('.addForm__moreInfo__today');
    const addFormPriority = document.querySelector('.addForm__moreInfo__priority');

    const toDoTitle = addFormTitle.value;
    const date = addFormDate.value;
    const today = addFormToday.checked
    const priority = addFormPriority.checked

    handleData.addTodo(new ToDo(toDoTitle, [], date, today, priority, false, ''));

    addFormTitle.value='';
    addFormToday.checked = false;
    addFormPriority.checked = false;

    closeAddTodoForm();
    handleDOM.renderAllTodos();
  }

  addForm.addEventListener('submit', (e) => submitTodoForm(e));
  todoListAddBtn.addEventListener('click', openAddTodoForm);
  headerAddBtn.addEventListener('click', openAddTodoForm);
  addFormOverlay.addEventListener('click', closeAddTodoForm);
})();

handleForm;


const handleDOM = (() => {
  const todoList = document.querySelector('.todo__list');
  const listTitle = document.querySelector('.todo__title');

  const renderTodos = (todo) => {
    const listItem = document.createElement('li');
    listItem.classList.add('todo__list__item');

    if(todo.checked === true){
      listItem.classList.add('checked');
    }

    const checked = document.createElement('div');
    checked.classList.add('todo__list__item__checked');
    if(todo.priority === true){
      checked.classList.add('priority');
    }
    if(todo.checked === true){
      checked.classList.add('checked');
    }
    checked.addEventListener('click', () => handleCondition.toggleCheckedBtn(todo.id));

    const title = document.createElement('h3');
    title.classList.add('todo__list__item__title');
    title.textContent = todo.title;
    title.addEventListener('click', () => renderInfo(todo));

    const today = document.createElement('div');
    if(todo.today === true){
      today.classList.add('todo__list__item__today');
      today.textContent = 'Today';
    }

    const date = document.createElement('div');
    if(todo.dueDate !== ''){

      date.classList.add('todo__list__item__date');
      date.textContent = `Due ${todo.dueDate}`;
    }

    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('todo__list__item__deleteBtn');
    deleteBtn.addEventListener('click', () => handleData.deleteTodo(todo.id));
    deleteBtn.innerHTML = '&times;';

    const mainBox = document.createElement('div');
    mainBox.classList.add('todo__list__item__mainBox');

    const subBox = document.createElement('div');
    subBox.classList.add('todo__list__item__mainBox__subBox');

    todoList.append(listItem);
    listItem.append(checked, mainBox, deleteBtn);
    mainBox.append(title, subBox);
    subBox.append(today, date);
  }

  const renderAllTodos = () => {
    const todoObj = handleData.getTodoObj();

    todoList.textContent = '';
    listTitle.textContent = 'All';
  
    todoObj.map((todo) => {
      renderTodos(todo);
    })
  }

  const renderTodayTodos = () => {
    const todoObj = handleData.getTodoObj();

    todoList.textContent = '';
    listTitle.textContent = 'Today';
  
    todoObj.map((todo) => todo.today === true
    ? renderTodos(todo) : ''
    )
  }

  const renderPlannedTodos = () => {
    const todoObj = handleData.getTodoObj();

    todoList.textContent = '';
    listTitle.textContent = 'Planned';
  
    todoObj.map((todo) => todo.dueDate !== ''
    ? renderTodos(todo) : ''
    )
  }

  const renderImportantTodos = () => {
    const todoObj = handleData.getTodoObj();

    todoList.textContent = '';
    listTitle.textContent = 'Important';
  
    todoObj.map((todo) => todo.priority === true
    ? renderTodos(todo) : ''
    )
  }

  const renderPersonalTodos = (project) => {
    const todoObj = handleData.getTodoObj();

    todoList.textContent = '';
    listTitle.textContent = project;
  
    todoObj.map((todo) => todo.project === project
    ? renderTodos(todo) : ''
    )
  }

  
  const renderInfo = (todo) => {
    console.log(todo);
  
    const todoAddInfo = document.querySelector('.info');
    todoAddInfo.textContent = '';
    todoAddInfo.classList.add('active');

    if(todo.checked === true){
      todoAddInfo.classList.add('checked');
    }else {
      todoAddInfo.classList.remove('checked');
    }
  
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
  
    const title = document.createElement('textarea');
    title.classList.add('info__title');
    title.textContent = todo.title;
    title.addEventListener('change', () => handleCondition.changeTodoTitle(todo.id, title.value));
    titleContainer.append(title);
  
    if(todo.description !== ''){
      todo.description.forEach(each => {
        const desc = document.createElement('p');
        desc.classList.add('info__desc');
        desc.textContent = `- ${each}`;
  
        const deleteBtn = document.createElement('div');
        deleteBtn.classList.add('info__desc__deleteBtn');
        deleteBtn.innerHTML = '&times;';
        // deleteBtn.addEventListener('click', ())
  
        desc.append(deleteBtn);
        titleContainer.append(desc);
      })
    }
  
    const descInput = document.createElement('input');
    descInput.classList.add('info__descInput');
    descInput.setAttribute('type', 'text');
    descInput.setAttribute('placeholder', '+ Add Description');
    titleContainer.append(descInput);
  
  
    const todayBtn = document.createElement('div');
    todayBtn.classList.add('info__todayBtn');
    todayBtn.addEventListener('click', () => handleCondition.toggleTodayBtn(todo.id));
    if(todo.today === true){
      todayBtn.textContent = `Remove from Today's To-do`;
      todayBtn.classList.remove('active');
    }else {
      todayBtn.textContent = `Add to Today's To-do`;
      todayBtn.classList.add('active');
    }

    const dateBtn = document.createElement('div');
    dateBtn.classList.add('info__dateBtn');
    const dateBtnLabel = document.createElement('label');
    dateBtnLabel.setAttribute('for', 'date');
    dateBtnLabel.textContent = 'Due';
    const dateBtnInput = document.createElement('input');
    dateBtnInput.classList.add('info__dateBtn__input');
    dateBtnInput.setAttribute('type', 'date');
    dateBtnInput.setAttribute('value', todo.dueDate);
    dateBtnInput.addEventListener('change', () => handleCondition.changeTodoDate(todo.id, dateBtnInput.value))
    dateBtn.append(dateBtnLabel, dateBtnInput);
  
    const priorityBtn = document.createElement('div');
    priorityBtn.classList.add('info__priorityBtn');
    priorityBtn.addEventListener('click', () => handleCondition.togglePriorityBtn(todo.id));
  
    if(todo.priority === true){
      priorityBtn.textContent = 'Remove from Priority';
    }else {
      priorityBtn.textContent = 'Add to Priority';
    }

    const projectBtnBox = document.createElement('div');
    projectBtnBox.classList.add('info__projectBtn-box');
    const projectBtn = document.createElement('select');
    projectBtn.classList.add('info__projectBtn');
    projectBtn.addEventListener('change', () => handleCondition.changeProject(todo.id, projectBtn.value))
    projectBtnBox.append(projectBtn);

    const currentProjectList = handleProjectData.getProjectObj();
    currentProjectList.map((project) => {
      const projectBtnOption = document.createElement('option');
      projectBtnOption.setAttribute('value', project.title);
      projectBtnOption.textContent = project.title;
      projectBtn.append(projectBtnOption);
    });

  
    todoAddInfo.append(titleContainer, todayBtn, dateBtn, priorityBtn, projectBtnBox)
  }

  const renderProjectList = () => {
    const projectList = document.querySelector('.project__personal-list');
    const projectObj = handleProjectData.getProjectObj();

    projectList.textContent = '';

    projectObj.map(project => {
      const projectListItem = document.createElement('li');
      projectListItem.textContent = project.title;

      const projectListDeleteBtn = document.createElement('div');
      projectListDeleteBtn.classList.add('project__personal-list__btn');
      projectListDeleteBtn.innerHTML = '&times;';
      projectListDeleteBtn.addEventListener('click', () => handleProjectData.deleteProject(project.id));

      projectList.append(projectListItem);
      projectListItem.append(projectListDeleteBtn);
    })
  }

  return {
    renderAllTodos,
    renderTodayTodos,
    renderPlannedTodos,
    renderImportantTodos,
    renderPersonalTodos,
    renderInfo,
    renderProjectList
  }

})();

const handleProjectEventListener = (() => {
  const allProject = document.querySelector('.project__default-list__all');
  const todayProject = document.querySelector('.project__default-list__today');
  const plannedProject = document.querySelector('.project__default-list__planned');
  const importantProject = document.querySelector('.project__default-list__important');

  allProject.addEventListener('click', () => handleDOM.renderAllTodos());
  todayProject.addEventListener('click', () => handleDOM.renderTodayTodos());
  plannedProject.addEventListener('click', () => handleDOM.renderPlannedTodos());
  importantProject.addEventListener('click', () => handleDOM.renderImportantTodos());

  //랜더링할때 정의하기
  // const personalProjects = document.querySelector('.project__personal-list').querySelectorAll('li');
  // console.log(personalProjects)
  // personalProjects.forEach(project => {
  //   project.addEventListener('click', handleDOM.renderPersonalTodos('projectTitle'))
  // })
})();

handleProjectEventListener;


const handleCondition = (() => {
  const changeTodoTitle = (id, newTitle) => {
    const todoObj = handleData.getTodoObj();

    const modifiedTodo = todoObj.map(todo => todo.id === id 
      ? { ...todo, title: newTitle}
      : todo);

    handleData.editTodo(modifiedTodo);
  }

  const toggleTodayBtn = (id) => {
    const todoObj = handleData.getTodoObj();

    const modifiedTodo = todoObj.map(todo => todo.id === id 
      ? { ...todo, today: !todo.today}
      : todo);

    handleData.editTodo(modifiedTodo);
  }

  const changeTodoDate = (id, newDate) => {
    const todoObj = handleData.getTodoObj();

    const modifiedTodo = todoObj.map(todo => todo.id === id 
      ? { ...todo, dueDate: newDate}
      : todo);

    handleData.editTodo(modifiedTodo);
  }
  
  const togglePriorityBtn = (id) => {
    const todoObj = handleData.getTodoObj();

    const modifiedTodo = todoObj.map(todo => todo.id === id 
      ? { ...todo, priority: !todo.priority}
      : todo);

    handleData.editTodo(modifiedTodo);
  }

  const toggleCheckedBtn = (id) => {
    const todoObj = handleData.getTodoObj();

    const modifiedTodo = todoObj.map(todo => todo.id === id 
      ? { ...todo, checked: !todo.checked}
      : todo);

    handleData.editTodo(modifiedTodo);
  }

  const changeProject = (id, newProject) => {
    const todoObj = handleData.getTodoObj();

    const modifiedTodo = todoObj.map(todo => todo.id === id 
      ? { ...todo, project: newProject}
      : todo);

    handleData.editTodo(modifiedTodo);
  }

  return {
    changeTodoTitle,
    toggleCheckedBtn,
    changeTodoDate,
    toggleTodayBtn,
    togglePriorityBtn,
    changeProject
  }
})();


//first-rendering
handleDOM.renderAllTodos();
handleDOM.renderProjectList();

