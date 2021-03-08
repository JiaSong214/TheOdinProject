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

  const changeTitle = (id, title) => {
    const todoObj = Model.todoModel.getData();
    const modifiedTodoObj = todoObj.filter((todo) =>
      todo.id === id ? todo.title = title : todo
    );

    Model.todoModel.changeData(modifiedTodoObj);
    View.todoView.renderAll(modifiedTodoObj);
  };


  const changeDate = (id, date) => {
    const todoObj = Model.todoModel.getData();
    const modifiedTodoObj = todoObj.filter((todo) =>
      todo.id === id ? todo.date = date : todo
    );

    Model.todoModel.changeData(modifiedTodoObj);
    View.todoView.renderAll(modifiedTodoObj);
  };


  //두번 클릭했을때 사라지는 문제 해결하기
  //새로운 배열 만들때 문제가 있는 듯?
  const changeChecked = (id) => {
    const todoObj = Model.todoModel.getData();
    const modifiedTodoObj = todoObj.filter((todo) =>
      todo.id === id ? todo.checked = !todo.checked : todo
    );

    console.log(todoObj)

    Model.todoModel.changeData(modifiedTodoObj);
    View.todoView.renderAll(modifiedTodoObj);
  };


  const changePriority = (id) => {
    const todoObj = Model.todoModel.getData();
    const modifiedTodoObj = todoObj.filter((todo) =>
      todo.id === id ? todo.priority = !todo.priority : todo
    );

    console.log(id);
    console.log(modifiedTodoObj);

    Model.todoModel.changeData(modifiedTodoObj);
    View.todoView.renderAll(modifiedTodoObj);
  };


  const changeProjectCategory = (id, project) => {
    const todoObj = Model.todoModel.getData();
    const modifiedTodoObj = todoObj.filter((todo) =>
      todo.id === id ? todo.project = project : todo
    );
  }


  const deleteTodo = (id) => {
    Model.todoModel.deleteData(id);

    View.todoView.renderAll(Model.todoModel.getData());
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

  const projectDefaultList = document.querySelectorAll('.project__default-list > li');

  projectDefaultList.forEach(projectList => {
    projectList.addEventListener('click', function () {
      const todoObj = Model.todoModel.getData();

      switch(this.textContent){
        case 'All':
          View.todoView.renderAll(todoObj);
          break;
        case 'Today':
          View.todoView.renderToday(todoObj);
          break;
        case 'Planned':
          View.todoView.renderPlanned(todoObj);
          break;
        case 'Important':
          View.todoView.renderImportant(todoObj);
          break;
      }
    })
  })

  //all event listeners
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
    changeTitle,
    changeDate,
    changeChecked,
    changePriority,
    changeProjectCategory,
    deleteTodo,
    openSidebar,
    deleteProject
  };
})();

export default Controller;
