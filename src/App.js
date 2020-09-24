import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import axios from 'axios';

firebase.initializeApp({
  apiKey: "AIzaSyDOqEZxpEt3iBJz0gWGi1ts6ZFZkqN4GK8",
  authDomain: "signup-auth-508fe.firebaseapp.com"
})



class App extends Component {
 constructor(props){
   super(props)
   this.state = { 
    email:'',
    password:''
  }
 }

  state={
    isSignedIn: false,
    isPasswordShown: false
  }
  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }
    
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }
    submitHandler=(e)=>{
      e.preventDefault();
      console.log(this.state);
      axios.post("https://reqres.in/api/register",this.state)
      .then(response=>console.log(response))
      .catch(response=>console.log(response))
    }
  render() {
    const { isPasswordShown } = this.state;
    const { email,password}=this.state;
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          </span>
        ) : (
          <div className="container contain">
        <div className={'style'}>
          <p>SIGN UP</p>
          <div className={'text'}>
            Create your account
          </div>
          <div className={'text2'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          </div>
        <StyledFirebaseAuth 
        style={{flexDirection: "row"}}
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
        <form onSubmit={this.submitHandler}>
        <input type="text"placeholder="First Name"/><br/>
        <input type="text"placeholder="Last Name"/><br/>
        <input type="email" name="email" value={email} placeholder="Email Address" onChange={(event)=>this.setState({email:event.target.value})}br/>
        <input type="Password" name="password" onChange={(event)=>this.setState({password:event.target.value})} placeholder="Password"
         type={isPasswordShown ? "text" : "password"}
         name="pass"/><i className="fa fa-eye password-icon"
         onClick={this.togglePasswordVisiblity} /> <br/>
         <p className="desc">By clicking on the Sign Up, you agree to our <span className="highlight"><a href="">Terms of Use</a></span> and our <span className="highlight"><a href="">Privacy Policy.</a></span></p><br/>
         <button className="btn">Sign Up</button>
        </form>
       
      </div>
      </div>
        )}
      </div>
    )
  }
}

export default App;
