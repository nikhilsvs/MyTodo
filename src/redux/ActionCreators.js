import * as ActionTypes from './ActionTypes';
import {TASKS} from '../shared/tasks';


export const addTask = (task)=>({
    type:ActionTypes.ADD_TASK,
    payload:task
});

export const addTasks = (tasks)=>({
    type:ActionTypes.ADD_TASKS,
    payload:tasks
});

export const fetchTasks = () => (dispatch) =>{
    var tasks = TASKS;

    dispatch(addTasks(tasks));
}

export const deleteTask = (task)=>({
    type:ActionTypes.DELETE_TASK,
    payload:task
});

export const deleteAll = () => ({
    type:ActionTypes.DELETE_ALL
});

export const searchTask = (newTasks)=>({
    type:ActionTypes.SEARCH_TASK,
    payload:newTasks
});