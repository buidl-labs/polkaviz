import React from "react";
import Relay from "./Relay";
import { Stage, Layer } from "react-konva";
import Validator from "./Validator";
import validatorData from "./data.json";

class App extends React.Component {
  render() {
    const arr = [];
    return (
      <div className="container">
        {console.log(validatorData[0].validator)}
        {Object.keys(validatorData).forEach(function(key) {
          arr.push(validatorData[key]);
        })}
        {console.log(arr)}
        <div className="heading">
          <h2>Polkadot Network</h2>
        </div>
        <div className="relay-circle">
          <Stage width={window.innerWidth} height={window.innerHeight}>
            {console.log(window.innerWidth)}
            <Layer>
              <Relay x={window.innerWidth} y={window.innerHeight} />
              {arr.map((person, index) => (
                <Validator
                  key={index}
                  angle={180 - (index * 360) / arr.length}
                  x={
                    window.innerWidth +
                    350 *
                      Math.cos((90 - (index * 360) / arr.length) * 0.0174533)
                  }
                  y={
                    window.innerHeight +
                    350 *
                      Math.sin((90 - (index * 360) / arr.length) * 0.0174533)
                  }
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

export default App;
