import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AuthService from "./components/auth/auth-service";
import ProtectedRoute from "./components/auth/protected-route"
import About from './components/about/About'
import Admin from "./components/admin/Admin";
import Home from "./components/home/Home"
import LandingPage from "./components/landingPage/LandingPage";
import Signup from "./components/signup/Signup";
import Houses from './components/houses/Houses'
import Main from './components/main/Main'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import Profile from './components/profile/Profile';
import Pricing from './components/pricing/Pricing';
import Ourcities from './components/ourcities/Ourcities'
import Booking from './components/booking/Booking'
import "./App.css";

AOS.init();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      showLogin: true,
    };
    this.service = new AuthService();
    this.getTheUser = this.getTheUser.bind(this);
    this.changeLogin = this.changeLogin.bind(this);
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate() {
    if(this.state.showLogin === false) this.setState({ showLogin: true })
  }

  getTheUser(userObj) {
    this.setState({
      loggedInUser: userObj
    });
  }

  changeLogin() {
    this.setState({ showLogin: !this.state.showLogin });
  }

  render() {
    return (
      <div className="App">
          <Switch>
            <Route path="/houses" exact={true} component={Houses} />
            <Route path="/" exact={true} render={(props)  => <LandingPage login={this.state.showLogin} changeLogin={this.changeLogin} getUser={this.getTheUser} {...props} />} />
            <Route path="/about" exact={true} component={About} />
            <Route path="/profile" exact={true} component={Profile} />
            <Route path="/ourcities" exact={true} component={Ourcities} />
            <Route path="/main" exact={true} component={Main} />
            <Route exact path="/home/:city" component={Home} />
            <Route exact path="/home-details/:id" component={Houses} />
            <Route exact path="/home-details/:id/booking" component={Booking} />
            <Route path="/pricing" exact={true} render={(props)  => <Pricing  user={this.state.loggedInUser} getUser={this.getTheUser} {...props} />} />
            {(this.state.loggedInUser!==null)?(
            <Route path="/signup" exact={true} render={(props) => <Signup loggedInUser={this.state.loggedInUser} getTheUser={this.getTheUser} {...props} />}/>
            ):null}
            {(this.state.loggedInUser)?(
              <ProtectedRoute 
                user={this.state.loggedInUser}
                exact 
                path="/dashboard" 
                component={Admin} 
              />
            ):null}
            {(this.state.loggedInUser)?(
              <ProtectedRoute 
                getUser={this.getTheUser}
                user={this.state.loggedInUser}
                exact
                path="/profile" 
                component={Profile} 
              />
            ):null}
        </Switch>
      </div>
    );
  }
}

export default App;
