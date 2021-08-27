const searchBar = document.getElementById('searchbar');
const addBtn = document.getElementById('btn');
const list = document.getElementById('list');
const checkbox = document.getElementsByClassName('checkbox');


// Takes a task and adds it to DOM
const addTaskToDom = function(task) {
    const taskId = task._id;

    // Create HTML elements
        const taskItem = document.createElement('div');
        const checkbox = document.createElement('input');
        const li = document.createElement('li');
        const deleteIcon = document.createElement('i');
        const taskName = document.createTextNode(task.description);

        //set atributes/classes
        taskItem.classList.add('task-item');
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", `${task._id}`);
        checkbox.classList.add('checkbox');
        li.classList.add("list-item");
        deleteIcon.classList.add('fa');
        deleteIcon.classList.add('fa-trash-o');
        deleteIcon.setAttribute("id", `${task._id}`);
        
        // append elements
        li.appendChild(taskName);
        taskItem.appendChild(checkbox);
        taskItem.appendChild(li);
        taskItem.appendChild(deleteIcon)
        list.appendChild(taskItem);

        //reset searchbar value to empty
        searchBar.value = "";

    // marking task as done
    checkbox.addEventListener('change', () => {
        li.classList.toggle('crossed-out');
        if(checkbox.checked == true){
            li.classList.add('crossed-out');
            taskDone(taskId);
         } else {
            li.classList.remove('crossed-out');
            taskUndone(taskId);
         }
    });

    //eventlistener to delete task from list
    deleteIcon.addEventListener('click', () => {
        list.removeChild(taskItem);
        deleteTask(taskId);
    })
}   

// Adding task to database
addBtn.addEventListener('click', () => {
    let inputField = searchBar.value;
    
    if(inputField.trim().length > 0){
        showNewTask();
    }
} );

const showNewTask = async function() {
    const newTask = await createNewTask();
    addTaskToDom(newTask);
}

//
const showAllTasks = async function() {
    //get tasks
    const tasks = await getAllTasks();
    console.log("task data: ");
    console.log(tasks);

    //Add all tasks to DOM
    tasks.map(task => addTaskToDom(task));
}

showAllTasks();