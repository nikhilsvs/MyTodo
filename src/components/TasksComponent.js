import React , {Component} from 'react';
import Header from './Headercomponent';
import {Card , CardBody , CardText , CardHeader, 
        Button ,  UncontrolledCollapse,Jumbotron,Input} from 'reactstrap';


        
class Task extends Component{

    constructor(props){
        super(props);

        this.state= {
            isCardOpen:false
        };

        this.toggleCard = this.toggleCard.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    componentDidMount(){
    
        this.props.tasks.forEach((task,index)=>{
            if(task.isCompleted){
                
                var ele = document.getElementById(task._id);
                var ele2 = ele.getElementsByClassName('itemCard')[0];
                ele2.style.backgroundColor="LightGreen";
                ele2.style.textDecoration="line-through";
                ele2.style.opacity="0.7";
            }
        })
    }

    putStyle(){
        this.props.tasks.forEach((task,index)=>{
            if(task.isCompleted){
                
                var ele = document.getElementById(task._id);
                var ele2 = ele.getElementsByClassName('itemCard')[0];
                ele2.style.backgroundColor="LightGreen";
                ele2.style.textDecoration="line-through";
                ele2.style.opacity="0.7";
                ele2.style.zIndex="2";
            }
        })
    }

    toggleCard(){
        this.setState({
            isCardOpen:!this.state.isCardOpen
        })
    }
    Completed(id){
        
            let idx = this.props.tasks.map((item)=>{return item._id;}).indexOf(id);
            this.props.tasks[idx].isCompleted = true;
            let tempTask = this.props.tasks[idx];
            this.props.updateTask(tempTask);
            this.putStyle();
    
    }
    handleFilter(event){
        this.props.tasks.forEach((task,index)=>{
            let item = document.getElementById(`${task._id}`);
            switch(event.target.value){
                case 'All':
                    item.style.display = "block";
                    break;

                case 'Completed':
                    if(task.isCompleted){
                        item.style.display="block";
                    }
                    else{
                        item.style.display="none";
                    }
                    break;
                case 'Pending':
                    if(task.isCompleted){
                        item.style.display="none";
                    }
                    else{
                        item.style.display="block";
                    }
                    break;
            }
        });
    }
    handleSearch(todos){
        var searchText = document.getElementById("search");
        this.props.tasks.forEach((task,index)=>{
            let item = document.getElementById(`${task._id}`);
            let searchedtext = item.getElementsByTagName("h6")[0].innerText;
            let searchtextboxval = searchText.value;
            let re = new RegExp(searchtextboxval, 'gi');
            if(searchedtext.match(re)){
                item.style.display="block";
            }
            else{
                item.style.display="none";
            }
        });
    }
    render(){


        const todos = this.props.tasks.map((task,index) => {
            var idx = task.taskname;

            idx = idx.replace(/\s+/g, '');

            return(
                <div key = {task._id} className="col-12" id={task._id}>
                    <Card className="m-1 itemCard" >
                        <CardHeader className="d-flex">
                           <h6>{task.taskname}</h6>
                            
                            <div className="row ml-auto align-self-center">
                                <Button className="btn btn-danger btn-outline m-1"
                                    onClick={()=>this.props.deleteTask(task._id)}><span className="fa fa-trash"></span></Button>
                                <Button className="btn btn-success btn-outline m-1"
                                    onClick={()=>this.Completed(task._id)}><span className="fa fa-check"></span></Button>
                                <Button className="m-1 btn-outline-dark" id={idx}  ><span className="fa fa-bars"></span></Button>
                            </div>    
                        </CardHeader>
                        <UncontrolledCollapse toggler={idx}>
                            <CardBody  >
                                <CardText>{task.desc}</CardText>
                            </CardBody>
                        </UncontrolledCollapse>
                        
                    </Card>       
                </div>
            );
            
        });

        return(
            <>
            <Header tasks={this.props.tasks} addTask={this.props.addTask}
                    deleteAll={this.props.deleteAll} addNewTask = {this.props.addNewTask}
                    auth = {this.props.auth} logoutUser = {this.props.logoutUser}/>
            <Jumbotron>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <h4>Your Tasks</h4>
                        </div>
                        <div className="col-4">
                            <Input type="search" name="search" id="search" 
                            placeholder="Search" onInput={()=>this.handleSearch(todos)}/>
                            
                        </div>
                        <div className="col-4">
                            <Input type="select" name="filter" id="filter" onClick={this.handleFilter}>
                                <option value="All">All</option>
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                            </Input>
                        </div>
                    </div>
                </div>
                
            </Jumbotron>
            <div className="container">
                <div className="row">
                    {
                        this.props.tasks.length>0
                        ?
                        todos
                        :
                        <h1>You have not added any tasks till yet</h1>
                    }
                    
                </div>
            </div>
           
            </>
        );
    }

}

export default Task;