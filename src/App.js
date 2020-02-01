import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import AddKey from "./components/AddKey";
import Home from "./components/Home";
import Keys from "./components/Keys";

function App() {
  return (
    <Router>
      <Header branding="RSA App" />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/keys" component={Keys} />
          <Route exact path="/add-key" component={AddKey} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
