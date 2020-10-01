import React , {Component} from 'react';
import Header from './Headercomponent';
import Task from './TasksComponent';
import {connect} from 'react-redux';
import {addTask,fetchTasks,deleteTask,deleteAll} from '../redux/ActionCreators';


const mapStateToProps = state =>{
    return{
        tasks:state.tasks
    }
    
}

const mapDispatchToProps = (dispatch) =>({
    addTask : (task) => dispatch(addTask(task)),
    fetchTasks:()=>{dispatch(fetchTasks())},
    deleteTask:(task)=>{dispatch(deleteTask(task))},
    deleteAll:()=>{dispatch(deleteAll())}
});

class Main extends Component{
    constructor(props){

        super(props);

    }
    componentDidMount(){
        this.props.fetchTasks();
    }

    render(){

        return(
        <>
            <Header tasks={this.props.tasks.tasks} addTask={this.props.addTask}
                    deleteAll={this.props.deleteAll} 
                   />
            <Task tasks={this.props.tasks.tasks} deleteTask={this.props.deleteTask}
                        />
        </>
            );
    }
};

export default (connect(mapStateToProps,mapDispatchToProps)(Main));