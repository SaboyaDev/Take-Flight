import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/index";
import Home from "./pages/Home";
import Footer from "./components/Footer/index";
import Leaders from "./pages/Leaders";
import Guide from "./pages/Guide";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/index" component={Home} />
              <Route exact path="/leaders" component={Leaders} />
              <Route exact path="/guide" component={Guide} />
            </Switch>
            <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
