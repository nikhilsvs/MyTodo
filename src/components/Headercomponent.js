import React , {Component} from 'react'
import {Navbar , NavbarBrand,Nav, NavbarToggler,NavItem,Collapse,
        Modal,ModalHeader,ModalBody,Form,Input,Label,FormGroup,
        Button,Jumbotron} from'reactstrap';
import {NavLink} from 'react-router-dom';


class Header extends Component{
    constructor(props){
        super(props);

        this.state = {
            isNavOpen : false,
            isModalOpen:false
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        
    }

    toggleNav(){
        this.setState({
            isNavOpen:!this.state.isNavOpen
        });
    }
    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }

    handleSubmit(event){
        this.toggleModal();
        alert("TaskName : " +  this.taskname.value + "\n"+ 
                "Description : " + this.desc.value);
        var task = {
            taskname:this.taskname.value,
            desc:this.desc.value,
            isCompleted:false
        };
        this.props.addNewTask(task);
        event.preventDefault();
    }

   handleLogout(){
       this.props.logoutUser();
       window.location.reload(false);
   }

   render(){
       return(
           <>
            <Navbar dark expand='sm' className="fixed-top navbar-dark">
                <div className="container">
                    <NavbarToggler onClick={this.toggleNav}></NavbarToggler>
                    <NavbarBrand href="/">
                           MyTodo
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar className="mr-auto">
                            
                            <NavItem>
                                <Button className="btn btn-block-success ml-auto" onClick={this.toggleModal}>Add New Task</Button>
                            </NavItem>
                            <NavItem>
                                <Button className="btn btn-danger m-2" onClick={this.props.deleteAll}>Delete All</Button>
                            </NavItem>
                           
                        </Nav>
                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <NavLink className = "nav-link username" to="/tasks">{this.props.auth.user.username}</NavLink>
                            </NavItem>
                            <NavItem>
                                <Button className="btn btn-outline-warning m-2" onClick = {this.handleLogout}>Logout</Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
            
             <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
               
                    <ModalHeader toggle={this.toggleModal}>
                    Add New Task
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label className="col-md-6" htmlFor="taskname">Your Task</Label>
                                <div className="col-md-12">
                                    <Input type="text" name="taskname" id="taskname" 
                                    placeholder="Enter New Task"
                                    innerRef={(input)=>this.taskname=input}/>
                                </div>
                               
                            </FormGroup>
                            <FormGroup row>
                                <Label className="col-md-6" htmlFor="desc">Description</Label>
                                <div className="col-md-12">
                                    <Input type="textarea" name="desc" id="desc" rows="5" placeholder="Describe Your Task"
                                    innerRef={(input)=>this.desc=input}/>
                                </div>
                                
                            </FormGroup>
                            <FormGroup row>
                                <div className="col-md-12">
                                    <Button className="btn-outline-warning btn-block" type="submit" >Submit</Button>
                                </div>
                                
                            </FormGroup>
                        </Form>
                    </ModalBody>
                
            </Modal>
         </>
       );
   }
   
}
export default Header;