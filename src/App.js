import React , {Component} from 'react';
import logo from './logo.svg';
import Main from './components/maincomponent';
import {ConfigureStore} from './redux/ConfigureStore';
import {Provider} from 'react-redux';
import './App.css';

const store = ConfigureStore();

class App extends Component{
  
  render(){
    
    return(
      <Provider store={store}>
        <Main/>
      </Provider>
      
    );
  }
}

export default App;
