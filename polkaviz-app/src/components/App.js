import React from "react";
import Relay from "./Relay";
import { Stage, Layer } from "react-konva";
import Validator from "./Validator";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="heading">
          <h2>Polkadot Network</h2>
        </div>
        <div className="relay-circle">
          <Stage width={window.innerWidth} height={window.innerHeight}>
            {console.log(window.innerWidth)}
            <Layer>
              <Relay x={window.innerWidth} y={window.innerHeight}/>
              <Validator x={window.innerWidth+750} y={window.innerHeight}/>
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

export default App;
