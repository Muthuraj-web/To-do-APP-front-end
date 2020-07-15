import React,{Component} from 'react';
import Home from './components/Home'
import Auth from './components/Auth'
import {Switch,Route, Redirect } from 'react-router-dom';
class App extends Component {
  render() {
    return (
        <Switch>
            <Route path="/auth" render={(props)=><Auth {...props}></Auth>}/>
            <Route path="/home" render={(props)=><Home {...props} jwt={localStorage.jwt}/>} />
            {localStorage.jwt?<Redirect from="/" to="/home"/>:<Redirect from="/" to="/auth" />}
        </Switch>
    );
  }
}

export default App;