import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase';
import {
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";

import SignIn from '../SignIn';
import Home from '../Home';
import Admin from '../Admin';
import Account from '../Account';
import PasswordForget from '../PasswordForget';
import SignUp from '../SignUp';

import * as ROUTES from '../../constants/routes';

class App extends Component {
  render() {
    return (
      <Router>
      <FirebaseAuthProvider firebase={firebase}>
              <IfFirebaseUnAuthed>
                <SignIn></SignIn>
              </IfFirebaseUnAuthed>
              <IfFirebaseAuthed>
                <Home></Home>
              </IfFirebaseAuthed>
            </FirebaseAuthProvider>
      
        <Route exact path={ROUTES.HOME} component={Home}/>
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget}/>
        <Route path={ROUTES.SIGN_IN} component={SignIn}/>
        <Route path={ROUTES.SIGN_UP} component={SignUp}/>
        <Route path={ROUTES.ACCOUNT} component={Account}/>
        <Route path={ROUTES.ADMIN} component={Admin}/>
      </Router>
    );
  }
}

export default App;