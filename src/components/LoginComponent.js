import React , {Component} from 'react';
import { withRouter,Redirect ,Link} from 'react-router-dom';
import {Input,Form,Label,FormGroup,Button,Modal,ModalHeader,ModalBody} from 'reactstrap';



function LoginSuccessful(){

    return (
        <Link to="/tasks" className = "btn-outline-dange btn-block-lg">See Your Profile</Link>
    )
}

class Login extends Component{

    constructor(props){
        super(props);


        this.state={
            isModalOpen:false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);

    
    }

    handleSignup(event){

        let obj = {
            username:this.username.value,
            password:this.password.value
        };
        this.props.signupUser(obj);
        this.toggleModal();
        event.preventDefault();
    }
    handleLogin(event){
        event.preventDefault();
        alert("Handle Login Triggered !!");
        let creds = {
            username : this.username.value,
            password : this.password.value
        }
        this.props.loginUser(creds);
        
    }

    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }
    render(){
        return(
                <>
                    <div className ="cnt">
                        <div className = "row loginrow">
                            <div className = "col-md-6 loginLeft text-center">
                                <div className="contentLeftLogin">
                                    <h4>Welcome to</h4>
                                    <h1><cite>The Ultimate Todo App</cite></h1>
                                </div>
                            </div>
                            <div className = "col-md-6 loginRight">
                                {
                                    !this.props.auth.isAuthenticated
                                    ?
                                <Form onSubmit = {this.handleLogin}>
                                    <FormGroup row>
                                        <Label htmlFor="username"> username</Label>
                                        <Input type="text" name="username" id="username" placeholder="username"
                                        innerRef = {(input)=>this.username=input}/>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="password"> password</Label>
                                        <Input type="password" name="password" id="password" placeholder="password"
                                        innerRef = {(input)=>this.password=input}/>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Input type="submit" className="btn btn-outline-danger btn-block">Login</Input>
                                    </FormGroup>
                                    <FormGroup row>
                                        <p>New To App ? <span className="signupbtn"><a onClick={this.toggleModal}>signup</a></span></p>
                                    </FormGroup>
                                </Form>
                                :
                                <div className="loggedIn">

                                    <h3>Hello</h3>
                                    <h1><cite>{this.props.auth.user.username}</cite></h1>
                                    <Link to="/tasks" className = "btn btn-outline-danger btn-block-lg">See Your Profile</Link>
                                </div>
                                
                            }   
                               
                                
                            </div>
                        </div>
                    </div>
                    <Modal isOpen={this.state.isModalOpen}>
                       
                            <ModalHeader className="signupHeader" toggle={this.toggleModal}>
                                Signup
                            </ModalHeader>
                            <ModalBody>
                                <Form onSubmit = {this.handleSignup}>
                                        <FormGroup row>
                                            <Label className = "col-md-6" htmlFor="username"> username</Label>
                                            <div className="col-md-12">
                                                <Input type="text" name="username" id="username" placeholder="username"
                                                innerRef = {(input)=>this.username=input}/>
                                            </div>
                                            
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label className="col-md-6" htmlFor="password"> password</Label>
                                            <div className="col-md-12">
                                                <Input type="password" name="password" id="password" placeholder="password"
                                                innerRef = {(input)=>this.password=input}/>
                                            </div>
                                            
                                        </FormGroup>
                                        <FormGroup row>
                                            <div className="col-md-12">
                                                <Input type="submit" className="btn btn-outline-danger btn-block">Login</Input>
                                            </div>
                                            
                                        </FormGroup>
                                </Form>
                            </ModalBody>
                       
                    </Modal>
                </>
        
                   
       
        )
    }

}

export default Login;