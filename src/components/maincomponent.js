import React , {Component} from 'react';
import Header from './Headercomponent';
import Task from './TasksComponent';
import Login from './LoginComponent';
import {connect} from 'react-redux';
import {loginUser} from '../redux/ActionCreators';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {addTask,fetchTasks,deleteTask,deleteAll,addNewTask,logoutUser,updateTask,signupUser} from '../redux/ActionCreators';


const mapStateToProps = state =>{
    return{
        tasks:state.tasks,
        auth:state.auth
    }
    
}

const mapDispatchToProps = (dispatch) =>({
    addTask : (task) => dispatch(addTask(task)),
    fetchTasks:()=>{dispatch(fetchTasks())},
    deleteTask:(id)=>{dispatch(deleteTask(id))},
    deleteAll:()=>{dispatch(deleteAll())},
    loginUser : (creds)=>{dispatch(loginUser(creds))},
    addNewTask : (newTask)=>{dispatch(addNewTask(newTask))},
    logoutUser:()=>{dispatch(logoutUser())},
    updateTask:(task)=>{dispatch(updateTask(task))},
    signupUser:(creds)=>{dispatch(signupUser(creds))}
});

class Main extends Component{
    constructor(props){

        super(props);

    }


    componentDidMount(){
      if(this.props.auth.isAuthenticated)
      {
        this.props.fetchTasks();
      }
    }
    render(){

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.auth.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }} />
            )} />
          );
          const PrivateRoute2 = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              !this.props.auth.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/tasks',
                    state: { from: props.location }
                  }} />
            )} />
          );
        return(
        <>
            <Switch>
                <Route path = '/login' component={()=><Login signupUser = {this.props.signupUser} auth = {this.props.auth} loginUser = {this.props.loginUser}/>}/>
                <PrivateRoute path = '/tasks' component={()=><Task fetchTasks = {this.props.fetchTasks} tasks={this.props.tasks.tasks} deleteTask={this.props.deleteTask}
                        addTask={this.props.addTask} addNewTask = {this.props.addNewTask} deleteAll = {this.props.deleteAll}
                        logoutUser = {this.props.logoutUser} auth = {this.props.auth}
                        updateTask = {this.props.updateTask}/>} />
                 <Redirect to="/tasks"/> 
            </Switch>
            
        </>
            );
    }
};

export default withRouter((connect(mapStateToProps,mapDispatchToProps)(Main)));