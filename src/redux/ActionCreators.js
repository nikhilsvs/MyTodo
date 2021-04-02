import * as ActionTypes from './ActionTypes';
import {TASKS} from '../shared/tasks';
import {baseUrl} from '../baseUrl';

export const addTask = (task)=>({
    type:ActionTypes.ADD_TASK,
    payload:task
});

export const addNewTask =(newTask)=>(dispatch)=>{

    fetch(baseUrl + "tasks",{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify(newTask)
    })
    .then((response)=>{
        if(response.ok){
            return response;
        }
        else{
            var err = new Error("Error in fetching tasks");
            err.response = response;
            throw err;
        }
    },(error)=>{
        throw error
    })
    .then((response)=>response.json())
    .then((response)=>{
        dispatch(addTasks(response));
    })
    .catch((err)=>{
        alert("Failed To add Task")
    });

}

export const addTasks = (tasks)=>({
    type:ActionTypes.ADD_TASKS,
    payload:tasks
});
export const fetchTasksFailed = (mess) =>({
    type:ActionTypes.FETCH_TASKS_FAILED,
    payload:mess
});
export const fetchTasks = () => (dispatch) =>{
    

    fetch(baseUrl + 'tasks',{
        method:'GET',
       
        headers:{
            'Origin':'http://localhost:3001',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+localStorage.getItem('token')
        }
    })
    .then((response)=>{
        if(response.ok){
            return response;
        }

        else{
            var err = new Error("Error in fetching tasks");
            err.response = response;
            throw err;
        }
    },(error)=>{
        throw error;
    })
    .then((response)=>{
        return response.json();
    })
    .then((response)=>{
        dispatch(addTasks(response));
    })
    .catch((e)=>{
        dispatch(fetchTasksFailed(e.message))
    })
}

export const deleteTask = (id)=>(dispatch)=>{
    fetch(baseUrl+`tasks/${id}`,{
        method:"DELETE",
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
    })
    .then((response)=>{
        if(response.ok){
            return response;
        }

        else{
            var err = new Error("Error in fetching tasks");
            err.response = response;
            throw err;
        }
    },(error)=>{
        throw error;
    })
    .then((response)=>{
        return response.json();
    })
    .then((response)=>{
        dispatch(addTasks(response));
    })
    .catch((e)=>{
        dispatch(fetchTasksFailed(e.message))
    })
};
export const deleteAllSuccess = ()=>({
    type:ActionTypes.DELETE_ALL
});
export const deleteAllFailed = ()=>({
    type:ActionTypes.DELETE_ALL_FAILED
});
export const updateTaskSuccess = (task)=>({
    type:ActionTypes.UPDATE_TASK_SUCCESS,
    payload:task
});
export const updateTaskFailed = (errmess) =>({
    type:ActionTypes.UPDATE_TASK_FAILURE,
    payload:errmess
});
export const updateTask = (task)=>(dispatch)=>{

    
    fetch(baseUrl + `tasks/${task._id}`,{
        method:'PUT',
        headers:{
            'Authorization':`bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify(task)
    })
    .then((response)=>{
        if(response.ok){
            return response;
        }
        else{
            var err = new Error("Error in update this task");
            err.response = response;
            throw err;
        }
    },(error)=>{
        throw error;
    })
    .then((response)=>response.json())
    .then((task)=>{
        dispatch(updateTaskSuccess(task));
    })
    .catch((err)=>{
        dispatch(updateTaskFailed(err.message));
    })

}
export const deleteAll = ()=>(dispatch)=> {
    
    fetch(baseUrl+'tasks',{
        method:'DELETE',
        headers:{
            'Authorization':`bearer ${localStorage.getItem('token')}`
        }
    })
    .then((response)=>{
        if(response.ok){
            return response;
        }

        else{
            var err = new Error("Error in fetching tasks");
            err.response = response;
            throw err;
        }
    },(error)=>{
        throw error;
    })
    .then((response)=>{
        return response.json();
    })
    .then((response)=>{
        dispatch(deleteAllSuccess(response));
    })
    .catch((e)=>{
        dispatch(deleteAllFailed(e.message))
    })

}

export const searchTask = (newTasks)=>({
    type:ActionTypes.SEARCH_TASK,
    payload:newTasks
});
export const loginRequest = (creds)=>({
    type:ActionTypes.LOGIN_REQUEST,
    payload:creds
});
export const loginSuccess = (response)=>({
    type:ActionTypes.LOGIN_SUCCESS,
    token:response.token
});
export const loginFailed = (mess) =>({
    type:ActionTypes.LOGIN_FAILED,
    message:mess
});
export const loginUser = (creds)=> (dispatch)=>{

    dispatch(loginRequest(creds));

    fetch(baseUrl + "users/login",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(creds)
    })
    .then((response)=>{
        if(response.ok){
            return response;
        }

        var err = new Error("Could not login");
        err.response = response;
        throw err;
    },(error)=>{
        throw error;
    })
    .then((response)=>{
        return response.json();
    })
    .then((response)=>{
        if(response.success){
            localStorage.setItem('token',response.token);
            localStorage.setItem('creds',JSON.stringify(creds));

            dispatch(loginSuccess(response));
            dispatch(fetchTasks());
        }
        else{
            var err = new Error("Error : " + response.status);
            err.response = response;
            throw err;
        }
    })
    .catch(error => dispatch(loginFailed(error.message)))

}
export const logoutRequest = ()=>({
    type:ActionTypes.LOGOUT_REQUEST
});
export const logoutSuccess = ()=>({
    type:ActionTypes.LOGOUT_SUCCESS
});
export const logoutFailed = (mess) =>({
    type:ActionTypes.LOGOUT_FAILED,
    payload:mess
});
export const logoutUser = () =>(dispatch)=>{

    dispatch(logoutRequest());
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(logoutSuccess());
}
export const signupUser = (creds)=>(dispatch)=>{
    fetch(baseUrl+"users/signup",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(creds)
    })
    .then((response)=>{
        if(response.ok){
            return response;
        }
        else{
            var err = new Error("User to signup");
            err.response = response;
            throw err;
        }
    },(error)=>{
        throw error;
    })
    .then((response)=>response.json())
    .then((response)=>{
        alert("User : " + response.username + 
            "\n Successfully Registered , Now you can Login");
    })
    .catch((err)=>{
        alert(err.message);
    })
}