import React from "react";
import Relay from "./Relay"
import Validator from "./Validator";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="heading">
          <h2>Polkadot Network</h2>
        </div>
        <div className="relay-circle">
            <Relay />
        </div>
      </div>
    );
  }
}

export default App;