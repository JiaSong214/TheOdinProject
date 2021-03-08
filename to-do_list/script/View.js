import Controller from "./Controller.js";

const View = (() => {
  const todoList = document.querySelector('.todo__list');
  const listTitle = document.querySelector('.todo__title');

  let checkedObserver = true;



  //create DOM for to-do list
  const renderTodo = (todo) => {
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
    checked.addEventListener('click', () => {
      Controller.changeChecked(todo.id);
    });

    const title = document.createElement('h3');
    title.classList.add('todo__list__item__title');
    title.textContent = todo.title;
    title.addEventListener('click', () => Controller.openSidebar(todo));

    const date = document.createElement('div');
    const currentDate = new Date();
    const today = currentDate.toISOString();

    //데이트 비교해서 today 넣기

    if(todo.dueDate !== ''){
      date.classList.add('todo__list__item__date');
      console.log(todo.dueDate, today)

      if(todo.dueDate === today){
        date.textContent = `Due to Today`;

      }else {
        date.textContent = `Due to ${todo.dueDate}`;
      }
    }

    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('todo__list__item__deleteBtn');
    deleteBtn.addEventListener('click', () => Controller.deleteTodo(todo.id));
    deleteBtn.innerHTML = '&times;';

    const mainBox = document.createElement('div');
    mainBox.classList.add('todo__list__item__mainBox');

    const subBox = document.createElement('div');
    subBox.classList.add('todo__list__item__mainBox__subBox');

    todoList.append(listItem);
    listItem.append(checked, mainBox, deleteBtn);
    mainBox.append(title, subBox);
    subBox.append(date);
  }


  //filter to do list by categories
  const todoView = {
    renderAll: (todoObj) => {
      todoList.textContent = '';
      listTitle.textContent = 'All';
    
      todoObj.map((todo) => {
        renderTodo(todo);
      });
    },
    renderToday: (todoObj) => {
      todoList.textContent = '';
      listTitle.textContent = 'Today';
    
      // todoObj.map((todo) => todo.today === true
      // ? renderTodo(todo) : ''
      // )
    },
    renderPlanned: (todoObj) => {
      todoList.textContent = '';
      listTitle.textContent = 'Planned';
    
      todoObj.map((todo) => todo.dueDate !== ''
      ? renderTodo(todo) : ''
      )
    },
    renderImportant: (todoObj) => {
      todoList.textContent = '';
      listTitle.textContent = 'Important';
    
      todoObj.map((todo) => todo.priority === true
      ? renderTodo(todo) : ''
      )
    },
    renderPersonalProject: (todoObj, project) => {
      todoList.textContent = '';
      listTitle.textContent = project;

      todoObj.map((todo) => todo.project === project
      ? renderTodo(todo) : ''
      )
    }
  }

  //create DOM for project list
  const renderProject = (projectObj) => {
    const projectList = document.querySelector('.project__personal-list');
    projectList.textContent = '';

    projectObj.map(project => {
      const projectListItem = document.createElement('li');
      projectListItem.textContent = project.title;
      projectListItem.addEventListener('click', () => {
        console.log(project.title)

      })

      const projectListDeleteBtn = document.createElement('div');
      projectListDeleteBtn.classList.add('project__personal-list__btn');
      projectListDeleteBtn.innerHTML = '&times;';
      projectListDeleteBtn.addEventListener('click', () => Controller.deleteProject(project.id));

      projectList.append(projectListItem);
      projectListItem.append(projectListDeleteBtn);
    });
  }


  const closeSidebar = () => {
    const todoAddInfo = document.querySelector('.info');
    todoAddInfo.classList.remove('active');
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

    const closeBtn = document.createElement('div');
    closeBtn.classList.add('info__closeBtn');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => closeSidebar());
    todoAddInfo.append(closeBtn);
  
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
  
    const title = document.createElement('textarea');
    title.classList.add('info__title');
    title.textContent = todo.title;
    title.addEventListener('change', () => Controller.changeTitle(todo.id, title.value));
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
  

    const dateBtn = document.createElement('div');
    dateBtn.classList.add('info__dateBtn');
    const dateBtnLabel = document.createElement('label');
    dateBtnLabel.setAttribute('for', 'date');
    dateBtnLabel.textContent = 'Due';
    const dateBtnInput = document.createElement('input');
    dateBtnInput.classList.add('info__dateBtn__input');
    dateBtnInput.setAttribute('type', 'date');
    dateBtnInput.setAttribute('value', todo.dueDate);
    dateBtnInput.addEventListener('change', () => Controller.changeDate(todo.id, dateBtnInput.value))
    dateBtn.append(dateBtnLabel, dateBtnInput);
  
    const priorityBtn = document.createElement('div');
    priorityBtn.classList.add('info__priorityBtn');
    priorityBtn.addEventListener('click', () => Controller.changePriority(todo.id));
  
    if(todo.priority === true){
      priorityBtn.textContent = 'Remove from Priority';
    }else {
      priorityBtn.textContent = 'Add to Priority';
    }

    const projectBtnBox = document.createElement('div');
    projectBtnBox.classList.add('info__projectBtn-box');
    const projectBtn = document.createElement('select');
    projectBtn.classList.add('info__projectBtn');
    projectBtn.addEventListener('change', () => Controller.changeProjectCategory(todo.id, projectBtn.value))
    projectBtnBox.append(projectBtn);


    projectList.map((project) => {
      const projectBtnOption = document.createElement('option');
      projectBtnOption.setAttribute('value', project.title);
      projectBtnOption.textContent = project.title;
      projectBtn.append(projectBtnOption);
    });

  
    todoAddInfo.append(titleContainer, dateBtn, priorityBtn, projectBtnBox)
  }


  //handle open&close the form
  const addFormOverlay = document.querySelector('.addForm-overlay');
  const addForm = document.querySelector('.addForm');

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

  return {
    todoView,
    renderProject,
    renderSidebar,
    controlTodoForm,

    checkedObserver
  }
})();

export default View;