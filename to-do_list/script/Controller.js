import Model from "./Model.js";
import View from "./View.js";

const Controller = (() => {
  //DOM variables
  const todoListAddBtn = document.querySelector(".todo__list__addBtn");
  const headerAddBtn = document.querySelector(".header__addBtn");
  const addForm = document.querySelector(".addForm");
  const projectAddForm = document.querySelector(".project__addForm");
  const addFormOverlay = document.querySelector('.addForm-overlay');
  const projectDefaultList = document.querySelectorAll('.project__default-list > li');


  //set the input calender for today
  const date = new Date();
  const defaultDate = document.querySelector('input[type="date"]');
  defaultDate.value = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;


  //default project
  let currentProject = 'All';
 

  //methods for manipulate to-do
  const todo = {
    addTodo: function (e) {
      //take values from form
      const addFormTitle = document.querySelector(".addForm__input");
      const addFormDate = document.querySelector(".addForm__moreInfo__date");
      const addFormPriority = document.querySelector(
        ".addForm__moreInfo__priority"
      );
  
      const newTodo = [
        addFormTitle.value,
        [],
        addFormDate.value,
        addFormPriority.checked,
        false,
        currentProject,
      ];
  
      Model.todoModel.addData(newTodo);
  
      //clean ther form after submit
      addFormTitle.value = "";
      addFormPriority.checked = false;
    },
    addDescription: function (id, desc) {
      const todoObj = Model.todoModel.getData();
      const modifiedTodoObj = todoObj.map(todo =>
        todo.id === id ? {...todo, description: [...todo.description, desc]} : todo
      );
  
      Model.todoModel.changeData(modifiedTodoObj);
      renderCurrentProject(currentProject);
    },
    deleteDescription: function (id, index) {
      const todoObj = Model.todoModel.getData();
      const selectedTodo = todoObj.filter(todo => todo.id == id);
      selectedTodo[0].description.splice(index,1);

      const modifiedTodoObj = todoObj.map(todo =>
        todo.id === id ? {...todo, description: selectedTodo[0].description} : todo
      );
  
      Model.todoModel.changeData(modifiedTodoObj);
      renderCurrentProject(currentProject);
    },
    changeTitle: function (id, title) {
      const todoObj = Model.todoModel.getData();
      const modifiedTodoObj = todoObj.map(todo =>
        todo.id === id ? {...todo, title: title} : todo
      );
  
      Model.todoModel.changeData(modifiedTodoObj);
      renderCurrentProject(currentProject);
    },
    changeDate: function (id, date) {
      const todoObj = Model.todoModel.getData();
      const modifiedTodoObj = todoObj.map(todo =>
        todo.id === id ? {...todo, dueDate: date} : todo
      );

      Model.todoModel.changeData(modifiedTodoObj);
      renderCurrentProject(currentProject);
    },
    changeChecked: function (id) {
      const todoObj = Model.todoModel.getData();
      const modifiedTodoObj = todoObj.map(todo => 
        todo.id === id ? { ...todo, checked: !todo.checked} : todo
      );

      Model.todoModel.changeData(modifiedTodoObj);
      renderCurrentProject(currentProject);
    },
    changePriority: function (id) {
      const todoObj = Model.todoModel.getData();
      const modifiedTodoObj = todoObj.map(todo =>
        todo.id === id ? {...todo, priority: !todo.priority} : todo
      );
  
      Model.todoModel.changeData(modifiedTodoObj);
      renderCurrentProject(currentProject);
    },
    changeProjectCategory: function (id, project) {
      const todoObj = Model.todoModel.getData();
      const modifiedTodoObj = todoObj.map(todo =>
        todo.id === id ? {...todo, project: project} : todo
      );

      Model.todoModel.changeData(modifiedTodoObj);
      renderCurrentProject(currentProject);
    },
    deleteTodo: function (id) {
      Model.todoModel.deleteData(id);
      renderCurrentProject(currentProject);
    }
  }

  //methods for manipulate project
  const project = {
    addProject: (e) => {
      const projectAddInput = document.querySelector(".project__addForm__input");
      Model.projectModel.addData(projectAddInput.value);
      projectAddInput.value = "";
    },
    deleteProject: (id) => {
      Model.projectModel.deleteData(id);
      View.renderProject(Model.projectModel.getData());
    }
  }

  
  const openSidebar = (todo) => {
    const projectList = Model.projectModel.getData();
    View.renderSidebar(todo, projectList);
  }


  const renderCurrentProject = (project) => {
    const todoObj = Model.todoModel.getData();
    View.clearTodo(project);
    currentProject = project;

    console.log(todoObj)

    switch(project){
      case 'All':
        todoObj.map(todo => View.renderTodo(todo));
        break;

      case 'Today':
        const currentDate = new Date();
        const todayDate = currentDate.toISOString().slice(0,10);
      
        todoObj.map((todo) => todo.dueDate === todayDate
          ? View.renderTodo(todo) : ''
        )
        break;

      case 'Planned':
        todoObj.map((todo) => todo.dueDate !== ''
          ? View.renderTodo(todo) : ''
        )
        break;

      case 'Important':
        todoObj.map((todo) => todo.priority === true
        ? View.renderTodo(todo) : ''
        )
        break;

      default:
        todoObj.map((todo) => todo.project === project
          ? View.renderTodo(todo) : ''
        )
        break;
    }
    View.activeProjectTitle(project);
    View.closeSidebar();
  }


  const renderFirstPage = () => {
    const todoObj = Model.todoModel.getData();
    View.clearTodo('All');
    todoObj.map(todo => View.renderTodo(todo));

    const projectObj = Model.projectModel.getData();
    View.renderProject(projectObj);
  };


  //all event listeners
  //default project list event listener
  projectDefaultList.forEach(projectList => {
    projectList.addEventListener('click', function () {
      renderCurrentProject(this.getAttribute('data-id'));
    });
  })

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //get all values and send to Model.js
    todo.addTodo(e);
    //close the form
    View.controlTodoForm.closeForm();
    //render new todo list in current project
    renderCurrentProject(currentProject);
  });

  projectAddForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //get a project name and send to Modal.js
    project.addProject(e);
    //get a new data from Model and render
    const projectObj = Model.projectModel.getData();
    View.renderProject(projectObj);
  });
  
  todoListAddBtn.addEventListener("click", View.controlTodoForm.openForm);
  headerAddBtn.addEventListener("click", View.controlTodoForm.openForm);
  addFormOverlay.addEventListener('click', View.controlTodoForm.closeForm);


  return {
    renderFirstPage,
    todo,
    project,
    openSidebar,
    renderCurrentProject
  };
})();

export default Controller;
