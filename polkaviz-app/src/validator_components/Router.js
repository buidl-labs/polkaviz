import React from "react";
import ValidatorApp from "./ValidatorApp";
import App from "../components/App";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function Router() {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/id" component={ValidatorApp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
