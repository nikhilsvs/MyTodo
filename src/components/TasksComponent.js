import React , {Component} from 'react';

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
                
                var ele = document.getElementById(index);
                ele.style.backgroundColor="LightGreen";
                ele.style.textDecoration="line-through";
                ele.style.opacity="0.7";
            }
        })
    }

    putStyle(){
        this.props.tasks.forEach((task,index)=>{
            if(task.isCompleted){
                
                var ele = document.getElementById(index);
                ele.style.backgroundColor="LightGreen";
                ele.style.textDecoration="line-through";
                ele.style.opacity="0.7";
            }
        })
    }

    toggleCard(){
        this.setState({
            isCardOpen:!this.state.isCardOpen
        })
    }
    Completed(idx,index){
        
            this.props.tasks[index].isCompleted=true;
            this.props.tasks.forEach((task,index)=>{
                console.log(task);
            })
            this.putStyle();
    
    }
    handleFilter(event){
        this.props.tasks.forEach((task,index)=>{
            var idx = task.name;
            idx = idx.replace(/\s+/g, '');
            let item = document.getElementById(`${idx}${idx}${idx}`);
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
            var idx = task.name;
            idx = idx.replace(/\s+/g, '');
            let item = document.getElementById(`${idx}${idx}${idx}`);
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
            var idx = task.name;
            idx = idx.replace(/\s+/g, '');
            return(
                <div key = {index} className="col-12" id={`${idx}${idx}${idx}`}>
                    <Card className="m-1" >
                        <CardHeader className="d-flex" id={index}>
                           <h6>{task.name}</h6>
                            
                            <div className="row ml-auto align-self-center">
                                <Button className="btn btn-danger btn-outline m-1"
                                    onClick={()=>this.props.deleteTask(task)}><span className="fa fa-trash"></span></Button>
                                <Button className="btn btn-success btn-outline m-1"
                                    onClick={()=>this.Completed(idx,index)}><span className="fa fa-check"></span></Button>
                                <Button className="m-1 btn-outline-dark" id={idx}  ><span className="fa fa-bars"></span></Button>
                            </div>    
                        </CardHeader>
                        <UncontrolledCollapse toggler={idx}>
                            <CardBody  >
                                <CardText>{task.description}</CardText>
                            </CardBody>
                        </UncontrolledCollapse>
                        
                    </Card>       
                </div>
            );
            
        });

        return(
            <>
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
                    {todos}
                </div>
            </div>
           
            </>
        );
    }

}

export default Task;