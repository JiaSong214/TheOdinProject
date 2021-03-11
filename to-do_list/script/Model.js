// ((exports) => {
  const Model = (() => {

    //Local Storage
    const LS = {
      todoLS: [],
      projectLS: [],

      defaultTodo: [
        {
          id: 0,
          title: 'Make a To Do List',
          description: ['Create CRUD', 'Connect to Memory'],
          dueDate: '2021-03-11',
          priority: true,
          checked: false,
          project: 'Study'
        },
        {
          id: 1,
          title: 'Clean the House',
          description: '',
          dueDate: '',
          priority: false,
          checked: true,
          project: ''
        },
        {
          id: 2,
          title: 'Grocery shopping for dinner',
          description: ['Eggplant', 'Tomato', 'Egg'],
          dueDate: '',
          priority: false,
          checked: false,
          project: 'Shopping'
        },
        {
          id: 3,
          title: 'Study Odin Project',
          description: '',
          dueDate: '2021-04-25',
          priority: false,
          checked: false,
          project: 'Study'
        },
        {
          id: 4,
          title: 'Call paypal',
          description: '',
          dueDate: '',
          priority: true,
          checked: false,
          project: ''
        }
      ],
      defaultProject: [
        {
          id: 0,
          title: 'Study'
        },
        {
          id: 1,
          title: 'Shopping'
        }
      ],

      getTodoLS: function () {
        return JSON.parse(localStorage.getItem('to-dos'));
      },
      setTodoLS: function (todos) {
        localStorage.setItem('to-dos', JSON.stringify(todos));
      },
      getProjectLS: function () {
        return JSON.parse(localStorage.getItem('projects'));
      },
      setProjectLS: function (projects) {
        localStorage.setItem('projects', JSON.stringify(projects));
      },
    }


    function ToDo (title, description, dueDate, priority, checked, project) {
      this.id = `${todoModel.getData().length}+${new Date().getTime()}`,
      this.title = title,
      this.description = description,
      this.dueDate = dueDate,
      this.priority = priority,
      this.checked = checked,
      this.project = project
    }
    
    function Project (title) {
      this.id = `${projectModel.getData().length}+${new Date().getTime()}`,
      this.title = title
    }


    const todoModel = {
      todoObj: [],
      getData: () => {
        return todoModel.todoObj;
      },
      addData: function (newData) {
        const newTodo = new ToDo(...newData);
        todoModel.todoObj.push(newTodo);

        LS.setTodoLS(this.getData());
      },
      deleteData: function (dataId) {
        const newTodoObj = todoModel.todoObj.filter(todo => todo.id !== dataId);
        todoModel.todoObj = newTodoObj;

        LS.setTodoLS(this.getData());
      },
      changeData: function (modifiedTodoObj) {
        todoModel.todoObj = modifiedTodoObj;

        LS.setTodoLS(this.getData());
      }
    }


    const projectModel = {
      projectObj: [],
      getData: () => {
        return projectModel.projectObj;
      },
      addData: function (newTitle) {
        const newProject = new Project(newTitle);
        projectModel.projectObj.push(newProject);

        console.log(this.getData())
        LS.setProjectLS(this.getData());
      },
      deleteData: function (dataId) {
        const newProjectObj = projectModel.projectObj.filter(project => project.id !== dataId);
        projectModel.projectObj = newProjectObj;

        LS.setProjectLS(this.getData());
      },
    }


    //Local Storage
    const getLocalStorage = () => {
      //if Local Storage is null, set default to-dos, projects.
      if(LS.getTodoLS() == null || LS.getProjectLS() == null){
        //set default To-dos
        LS.todoLS = LS.defaultTodo;
        todoModel.todoObj.push(...LS.todoLS);
        LS.setTodoLS(LS.todoLS);

        //set default projects
        LS.projectLS = LS.defaultProject;
        projectModel.projectObj.push(...LS.projectLS);
        LS.setProjectLS(LS.projectLS);
      }else {
        //if Local Storage is not empty, get data and set them
        LS.todoLS = LS.getTodoLS();
        todoModel.todoObj.push(...LS.todoLS);

        LS.projectLS = LS.getProjectLS();
        projectModel.projectObj.push(...LS.projectLS);
      }
    }

    //first rendering
    getLocalStorage();


    return {
      todoModel,
      projectModel
    }
  })();

  export default Model;

//   exports.Model = Model;
// })(this);