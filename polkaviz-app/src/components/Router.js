import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import KusamaApp from "./kusama/KusamaApp";
import ValidatorApp from "./validator_components/ValidatorApp";
import NewValidatorApp from "./new_validator_components/ValidatorApp";
import CouncilApp from "./council_components/CouncilApp";

class Router extends React.Component {
  componentWillUnmount() {
    this.ismounted = false;
    clearInterval(this.interval);
  }

  render() {
    return (
      <>
        <HashRouter>
          <div id="main">
            <Switch>
              <Route exact path="/" render={props => <KusamaApp />} />
              <Route path="/alexander" render={props => <KusamaApp />} />
              <Route exact path="/kusama" render={props => <KusamaApp />} />
              <Route
                exact
                path="/kusama/validator/:id"
                render={props => <ValidatorApp />}
              />
              <Route
                exact
                path="/kusama/new_validator/:id"
                render={props => <NewValidatorApp />}
              />
              <Route
                exact
                path="/kusama/council/:id"
                render={props => <CouncilApp />}
              />
            </Switch>
          </div>
        </HashRouter>
      </>
    );
  }
}
export default Router;
