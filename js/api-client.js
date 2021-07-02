const baseUrl = 'http://localhost:3000/';

//GET all tasks

const getAllTasks = async () => {
    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await response.json();
    // console.log(data);
    return data;
}

//POST new task
 const createNewTask = async () => {
        const body = {description: `${searchbar.value}`, done: false};
        try{
            const res = await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
            })

            const data = await res.json();
            return data;
        }
            catch(err) {
                console.error(err);
            } 
}

//PUT task is done
const taskDone = async (taskId) => {
    const body = {done: true};
    
    try{
        const res = await fetch(`http://localhost:3000/${taskId}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
        })

        const data = await res.json();

        console.log(data);
        
    } catch(err) {
            console.error(err);
        } 
}




// const taskUndone = async (taskId) => {
//     const body = {done: false};
    
//     try{
//         const res = await fetch(`http://localhost:3000/${taskId}`, {
//         method: "PUT",
//         body: JSON.stringify(body),
//         headers: {
//             "Content-Type": "application/json",
//         },
//         })

//         const data = await res.json();

//         console.log(data);
        
//     } catch(err) {
//             console.error(err);
//         } 
// }

    
//DELETE
const deleteTask = async (taskId) => {
    try{
        const res = await fetch(baseUrl + taskId, {
            method: "DELETE",
        });
        const data = await res.json();
        console.log(data);

    } catch(err) {
            console.error(err);
        }   
 }

