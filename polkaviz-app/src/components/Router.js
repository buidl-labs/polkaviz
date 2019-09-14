import React from "react";
import ValidatorApp from "./validator_components/ValidatorApp";
import App from "./App";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function Router() {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/:validatorAddress" component={ValidatorApp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
