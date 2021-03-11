// ((exports) => {
  const Model = (() => {

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
      todoObj: [
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
          dueDate: '',
          priority: false,
          checked: false,
          project: 'Study'
        }
      ],
      getData: () => {
        return todoModel.todoObj;
      },
      addData: (newData) => {
        const newTodo = new ToDo(...newData);
        todoModel.todoObj.push(newTodo);
      },
      deleteData: (dataId) => {
        const newTodoObj = todoModel.todoObj.filter(todo => todo.id !== dataId);
        todoModel.todoObj = newTodoObj;
      },
      changeData: (modifiedTodoObj) => {
        todoModel.todoObj = modifiedTodoObj;
      }
    }
  
    const projectModel = {
      projectObj: [
        {
          id: 0,
          title: 'Study'
        },
        {
          id: 1,
          title: 'Shopping'
        }
      ],
      getData: () => {
        return projectModel.projectObj;
      },
      addData: (newTitle) => {
        const newProject = new Project(newTitle);
        projectModel.projectObj.push(newProject);
      },
      deleteData: (dataId) => {
        const newProjectObj = projectModel.projectObj.filter(project => project.id !== dataId);
  
        projectModel.projectObj = newProjectObj;
      },
    }

    return {
      todoModel,
      projectModel
    }
  })();

  export default Model;

//   exports.Model = Model;
// })(this);