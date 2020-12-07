import "./App.css";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Components/Layouts/Landing";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Alert from "./Components/Layouts/Alert";
import Dashboard from "./Components/Dashboard/Dashboard";
import CreateProfile from "./Components/Profileforms/CreateProfile";
import EditProfiles from "./Components/Profileforms/EditProfiles";
import AddExeperience from "./Components/Profileforms/AddExeperience";
import AddEducation from "./Components/Profileforms/AddEducation";
import Profiles from "./Components/Profiles/Profiles";
import Profile from "./Components/Profile/Profile";
import Posts from "./Components/Posts/Posts";
import Post from "./Components/Post/Post";
import PrivateRoute from "./Components/Routing/PrivateRoute";
//Redux
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import Navbar from "./Components/Layouts/Navbar";
import { loadUser } from "./Redux/Actions/Auth";
import setAuthToken from "./Utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={Store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing}></Route>
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />

              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfiles}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExeperience}
              />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute path="/:id" component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
