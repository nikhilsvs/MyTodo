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
            name:this.taskname.value,
            description:this.desc.value,
            isCompleted:false
        };
        this.props.addTask(task);
        event.preventDefault();
    }

   

   render(){
       return(
           <>
            <Navbar dark expand='sm'>
                <div className="container">
                    
                    <NavbarBrand className="mr-auto" href="/">
                           MyTodo
                    </NavbarBrand>
                    
                        <Nav navbar className="ml-auto">
                           
                            <NavItem>
                                <Button className="btn btn-block-success ml-auto" onClick={this.toggleModal}>Add New Task</Button>
                                <Button className="btn btn-danger m-2" onClick={this.props.deleteAll}>Delete All</Button>
                                
                            </NavItem>
                            
                        </Nav>
                    
                    
                </div>
            </Navbar>
            
             <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                 <div className="container">
                    <ModalHeader toggle={this.toggleModal}>
                    Add New Task
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="taskname">Your Task</Label>
                                <Input type="text" name="taskname" id="taskname" 
                                placeholder="Enter New Task"
                                innerRef={(input)=>this.taskname=input}/>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="desc">Description</Label>
                                <Input type="textarea" name="desc" id="desc" rows="5" placeholder="Describe Your Task"
                                innerRef={(input)=>this.desc=input}/>
                            </FormGroup>
                            <FormGroup row>
                                <Button className="bg-primary" type="submit" >Submit</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                 </div>  
            </Modal>
         </>
       );
   }
   
}
export default Header;