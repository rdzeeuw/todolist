const searchBar = document.getElementById('searchbar');
const addBtn = document.getElementById('btn');
const list = document.getElementById('list');
const checkbox = document.getElementsByClassName('checkbox');



// add new task to DOM and to db
const addTask = () => {
    let inputField = searchBar.value;
    

    if(inputField.trim().length > 0){
        const taskItem = document.createElement('div');
        const checkbox = document.createElement('input');
        const li = document.createElement('li');
        const deleteIcon = document.createElement('i');
        const taskName = document.createTextNode(inputField);

        taskItem.classList.add('task-item');
        checkbox.setAttribute("type", "checkbox");
        // checkbox.setAttribute("id", `${inputField}`);
        checkbox.classList.add('checkbox');
        li.classList.add("list-item");
        deleteIcon.classList.add('fa');
        deleteIcon.classList.add('fa-trash-o');
        deleteIcon.setAttribute("id", `${inputField}`);
        
        li.appendChild(taskName);
        taskItem.appendChild(checkbox);
        taskItem.appendChild(li);
        taskItem.appendChild(deleteIcon)
        list.appendChild(taskItem);

        //reset searchbar value to empty
        searchBar.value = "";
        // eventlistener to cross out task
        checkbox.addEventListener('change', () => {
            li.classList.toggle('crossed-out');
        })
        //eventlistener to delete task from list
        deleteIcon.addEventListener('click', () => {
            list.removeChild(taskItem);
            deleteTask();
        })

    }
    
        
}



addBtn.addEventListener('click', () => {
    createNewTask();
    // addTask();
} );