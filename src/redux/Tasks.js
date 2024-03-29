
import * as ActionTypes from './ActionTypes';

export const Tasks = (state={
    tasks:[],
    err : null
},action)=>{

    switch(action.type){

        case ActionTypes.ADD_TASKS:
            return{...state,tasks:action.payload}

        case ActionTypes.ADD_TASK : 
            var task = action.payload;
            return{...state,tasks:state.tasks.concat(task)};

        case ActionTypes.DELETE_TASK:
            var temptask = action.payload;
            var newTasks = state.tasks.filter((task)=>task.name!=temptask.name);
            return{...state,tasks:newTasks}

        case ActionTypes.DELETE_ALL:
            return{...state,tasks:[]}

        case ActionTypes.SEARCH_TASK:
            return {...state,tasks:action.payload}

        case ActionTypes.UPDATE_TASK_SUCCESS:
            let updatedTasks = state.tasks.map((item,idx)=>{
                if(item._id == action.payload._id){
                    item = action.payload;
                }

                return item;
            });
            return {...state,tasks:updatedTasks};
            
        default : return state; 

    }
}