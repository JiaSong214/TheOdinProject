import Model from "./Model.js";
import View from "./View.js";

const Controller = (() => {
  //DOM variables
  const todoListAddBtn = document.querySelector(".todo__list__addBtn");
  const headerAddBtn = document.querySelector(".header__addBtn");
  const addForm = document.querySelector(".addForm");
  const projectAddForm = document.querySelector(".project__addForm");
  const addFormOverlay = document.querySelector('.addForm-overlay');


  //set the calender for today
  const date = new Date();
  const defaultDate = document.querySelector('input[type="date"]');
  defaultDate.value = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;


  //To-do form submit event
  const submitTodoForm = (e) => {
    e.preventDefault();

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
      "",
    ];

    Model.todoModel.addData(newTodo);

    //clean ther form after submit
    addFormTitle.value = "";
    addFormPriority.checked = false;
  };


  //project name form submit event
  const submitProjectForm = (e) => {
    e.preventDefault();
    const projectAddInput = document.querySelector(".project__addForm__input");
    const newProjectTitle = projectAddInput.value;
    Model.projectModel.addData(newProjectTitle);
    projectAddInput.value = "";
  };
 

  //methods for change todo
  const changeTodo = {
    todoObj: Model.todoModel.getData(),

    changeTitle: function (id, title) {
      const modifiedTodoObj = this.todoObj.filter((todo) =>
        todo.id === id ? todo.title = title : todo
      );
  
      Model.todoModel.changeData(modifiedTodoObj);
      renderCurrentProject(currentProject);
    },
    changeDate: function (id, date) {
      const modifiedTodoObj = this.todoObj.filter((todo) =>
        todo.id === id ? todo.date = date : todo
      );
  
      Model.todoModel.changeData(modifiedTodoObj);
      renderCurrentProject(currentProject);
    },
    changeChecked: function (id) {
      const modifiedTodoObj = this.todoObj.filter((todo) =>
        todo.id === id ? todo.checked = !todo.checked : todo
      );
  
      console.log(this.todoObj)
  
      Model.todoModel.changeData(modifiedTodoObj);
      renderCurrentProject(currentProject);
    },
    changePriority: function (id) {
      const modifiedTodoObj = this.todoObj.filter((todo) =>
        todo.id === id ? todo.priority = !todo.priority : todo
      );
  
      console.log(id);
      console.log(modifiedTodoObj);
  
      Model.todoModel.changeData(modifiedTodoObj);
      renderCurrentProject(currentProject);
    },
    changeProjectCategory: function (id, project) {
      const modifiedTodoObj = this.todoObj.filter((todo) =>
        todo.id === id ? todo.project = project : todo
      );
    },
    deleteTodo: function (id) {
      Model.todoModel.deleteData(id);
      renderCurrentProject(currentProject);
    }
  }


  const deleteProject = (id) => {
    Model.projectModel.deleteData(id);

    View.renderProject(Model.projectModel.getData());
  }


  const renderFirstPage = () => {
    const todoObj = Model.todoModel.getData();
    View.todoView.renderAll(todoObj);

    const projectObj = Model.projectModel.getData();
    View.renderProject(projectObj);
  };

  
  const openSidebar = (todo) => {
    const projectList = Model.projectModel.getData();
    View.renderSidebar(todo, projectList);
  }

  let currentProject = 'All';
  const projectDefaultList = document.querySelectorAll('.project__default-list > li');

  const renderCurrentProject = (project) => {
    const todoObj = Model.todoModel.getData();
    
    switch(project){
      case 'All':
        View.todoView.renderAll(todoObj);
        currentProject = 'All';
        break;
      case 'Today':
        View.todoView.renderToday(todoObj);
        currentProject = 'Today';
        break;
      case 'Planned':
        View.todoView.renderPlanned(todoObj);
        currentProject = 'Planned';
        break;
      case 'Important':
        View.todoView.renderImportant(todoObj);
        currentProject = 'Important';
        break;
    }

    View.activeProjectTitle(project);
  }


  //all event listeners
  projectDefaultList.forEach(projectList => {
    projectList.addEventListener('click', function () {
      renderCurrentProject(this.textContent);
    });
  })

  addForm.addEventListener("submit", (e) => {
    //get all values and send to Model.js
    submitTodoForm(e);
    //close the form
    View.controlTodoForm.closeForm();
    //clear the list
    //get a new data from Model and render
    const todoObj = Model.todoModel.getData();
    View.todoView.renderAll(todoObj);
  });

  projectAddForm.addEventListener("submit", (e) => {
    //get a project name and send to Modal.js
    submitProjectForm(e);
    //get a new data from Model and render
    const projectObj = Model.projectModel.getData();
    View.renderProject(projectObj);
  });
  
  todoListAddBtn.addEventListener("click", View.controlTodoForm.openForm);
  headerAddBtn.addEventListener("click", View.controlTodoForm.openForm);
  addFormOverlay.addEventListener('click', View.controlTodoForm.closeForm);

  return {
    renderFirstPage,
    changeTodo,
    openSidebar,
    deleteProject
  };
})();

export default Controller;
