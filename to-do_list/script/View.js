import Controller from "./Controller.js";

const View = (() => {
  const addFormOverlay = document.querySelector('.addForm-overlay');
  const addForm = document.querySelector('.addForm');
  const todoList = document.querySelector('.todo__list');

  

  //handle open&close the form
  const controlTodoForm = {
    openForm: () => {
      addFormOverlay.classList.add('active');
      addForm.classList.add('active');
    },
    closeForm: () => {
      addFormOverlay.classList.remove('active');
      addForm.classList.remove('active');
    }
  }

  //clear to-do list and put new title before rendering
  const clearTodo = (title) => {
    todoList.textContent = '';

    const listTitle = document.querySelector('.todo__title');
    listTitle.textContent = title;
  }


  //create DOM for to-do list
  const renderTodo = (todo) => {
    const listItem = document.createElement('li');
    listItem.classList.add('todo__list__item');

    if(todo.checked === true){
      listItem.classList.add('checked');
    }

    //checked button
    const checked = document.createElement('div');
    checked.classList.add('todo__list__item__checked');
    checked.addEventListener('click', () => Controller.todo.changeChecked(todo.id));

    if(todo.checked === true){
      checked.classList.add('checked');
    }else if(todo.priority === true){
      checked.classList.add('priority');
    }

    //to-do title
    const title = document.createElement('h3');
    title.classList.add('todo__list__item__title');
    title.textContent = todo.title;
    title.addEventListener('click', () => Controller.openSidebar(todo));

    //due date
    const date = document.createElement('div');
    const currentDate = new Date();
    const todayDate = currentDate.toISOString().slice(0,10);

    if(todo.dueDate !== ''){
      date.classList.add('todo__list__item__date');

      if(todo.dueDate === todayDate){
        date.textContent = `Due to Today`;
      }else {
        date.textContent = `Due to ${todo.dueDate}`;
      }
    }

    //delete button
    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('todo__list__item__deleteBtn');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', () => Controller.todo.deleteTodo(todo.id));

    //styling structure
    const mainBox = document.createElement('div');
    mainBox.classList.add('todo__list__item__mainBox');

    const subBox = document.createElement('div');
    subBox.classList.add('todo__list__item__mainBox__subBox');

    todoList.append(listItem);
    listItem.append(checked, mainBox, deleteBtn);
    mainBox.append(title, subBox);
    subBox.append(date);
  }


  //create DOM for project list
  const renderProject = (projectObj) => {
    const projectList = document.querySelector('.project__personal-list');
    projectList.textContent = '';

    projectObj.map(project => {
      //project title
      const projectListItem = document.createElement('li');
      projectListItem.textContent = project.title;
      projectListItem.classList.add(`project__personal-list__${project.title}`)
      projectListItem.setAttribute('data-id', project.title);
      projectListItem.addEventListener('click', () => {
        Controller.renderCurrentProject(project.title);
      })

      //project delete btn
      const projectListDeleteBtn = document.createElement('div');
      projectListDeleteBtn.classList.add('project__personal-list__btn');
      projectListDeleteBtn.innerHTML = '&times;';
      projectListDeleteBtn.addEventListener('click', () => Controller.project.deleteProject(project.id));

      projectList.append(projectListItem);
      projectListItem.append(projectListDeleteBtn);
    });
  }


  //project section active effect
  const activeProjectTitle = (project) => {
    let targetProject;
    const allProjectList = document.querySelectorAll('.project__default-list > li, .project__personal-list > li');

    //remove class 'active' from all project first,
    allProjectList.forEach(projectList => {
      projectList.classList.remove('active');
      //and find a selected project,
      if(projectList.getAttribute('data-id') === project){
        targetProject = projectList
      }
    })
    //add 'active' class to selected project
    targetProject.classList.add('active');
  }


  //create DOM for side bar
  const renderSidebar = (todo, projectList) => {
    const todoAddInfo = document.querySelector('.info');
    todoAddInfo.textContent = '';
    todoAddInfo.classList.add('active');

    //if to do is finished, side bar is not activated.
    if(todo.checked === true){
      todoAddInfo.classList.add('checked');
    }else {
      todoAddInfo.classList.remove('checked');
    }

    //side bar close button
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('info__closeBtn');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => closeSidebar());
    todoAddInfo.append(closeBtn);
  
    //to-do title
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
  
    const title = document.createElement('textarea');
    title.classList.add('info__title');
    title.textContent = todo.title;
    title.addEventListener('change', () => Controller.todo.changeTitle(todo.id, title.value));
    titleContainer.append(title);
  
    //to-do description
    if(todo.description !== ''){
      const descUl = document.createElement('ul');

      todo.description.forEach(each => {
        const desc = document.createElement('li');
        desc.classList.add('info__desc');
        desc.textContent = `- ${each}`;
  
        const deleteBtn = document.createElement('div');
        deleteBtn.classList.add('info__desc__deleteBtn');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', function() {
          //find a child order to remove it from array with index
          let deleteItemIndex;

          this.parentNode.parentNode.childNodes.forEach((desc,index) => {
            if(desc === this.parentNode) deleteItemIndex = index;
          })

          Controller.todo.deleteDescription(todo.id, deleteItemIndex)
        })
  
        desc.append(deleteBtn);
        descUl.append(desc);
        titleContainer.append(descUl);
      })
    }
  
    const descForm = document.createElement('form');
    titleContainer.append(descForm);

    const descInput = document.createElement('input');
    descInput.classList.add('info__descInput');
    descInput.setAttribute('type', 'text');
    descInput.setAttribute('placeholder', '+ Add Description');
    descForm.append(descInput);

    descForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const inputValue = descInput.value;
      Controller.todo.addDescription(todo.id, inputValue);
    })
  
    //due date button
    const dateBtn = document.createElement('div');
    dateBtn.classList.add('info__dateBtn');
    const dateBtnLabel = document.createElement('label');
    dateBtnLabel.setAttribute('for', 'date');
    dateBtnLabel.textContent = 'Due';
    const dateBtnInput = document.createElement('input');
    dateBtnInput.classList.add('info__dateBtn__input');
    dateBtnInput.setAttribute('type', 'date');
    dateBtnInput.setAttribute('value', todo.dueDate);
    dateBtnInput.addEventListener('change', () => Controller.todo.changeDate(todo.id, dateBtnInput.value))
    dateBtn.append(dateBtnLabel, dateBtnInput);
  
    //priority button
    const priorityBtn = document.createElement('div');
    priorityBtn.classList.add('info__priorityBtn');
    priorityBtn.addEventListener('click', () => Controller.todo.changePriority(todo.id));
  
    if(todo.priority === true){
      priorityBtn.textContent = 'Remove from Priority';
    }else {
      priorityBtn.textContent = 'Add to Priority';
    }

    //project select form
    const projectBtnBox = document.createElement('div');
    projectBtnBox.classList.add('info__projectBtn-box');
    const projectBtn = document.createElement('select');
    projectBtn.classList.add('info__projectBtn');
    projectBtn.addEventListener('change', () => Controller.todo.changeProjectCategory(todo.id, projectBtn.value))
    projectBtnBox.append(projectBtn);

    const projectBtnOptionDefault = document.createElement('option');
    projectBtnOptionDefault.innerHTML = `<option value="" disabled hidden>Choose a project</option>`
    projectBtn.append(projectBtnOptionDefault);

    projectList.map((project) => {
      const projectBtnOption = document.createElement('option');
      projectBtnOption.setAttribute('value', project.title);
      projectBtnOption.textContent = project.title;
      projectBtn.append(projectBtnOption);

      if(todo.project === project.title){
        projectBtnOption.setAttribute('selected', 'selected');
      }
    });
  
    todoAddInfo.append(titleContainer, dateBtn, priorityBtn, projectBtnBox)
  }


  const closeSidebar = () => {
    const todoAddInfo = document.querySelector('.info');
    todoAddInfo.classList.remove('active');
  }


  return {
    controlTodoForm,
    renderTodo,
    clearTodo,
    renderProject,
    activeProjectTitle,
    renderSidebar,
    closeSidebar,
  }
})();

export default View;