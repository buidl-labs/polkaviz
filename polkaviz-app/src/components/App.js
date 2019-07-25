import React from "react";
import Relay from "./Relay";
import { Stage, Layer } from "react-konva";
import Validator from "./Validator";
import validatorData from "./data.json";
import BlockAnimation from "./BlockAnimation";
import { WsProvider, ApiPromise } from '@polkadot/api';

class App extends React.Component {
  constructor() {
    super();
    this.latestBlockAuthor=undefined;
    this.state = {
      validators:[] ,
      lastAuthor: "",
    };
  }
  componentDidMount(){
    this.createApi();
  }
  async createApi() {
    const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
    const api = await ApiPromise.create(provider);

    const data = await api.derive.chain.subscribeNewHead((block) => {
      console.log(`block #${block.author}`)
      const lastAuthor = block.author.toString();
      this.setState({lastAuthor})
    });
    const allValidatorsForThisSession = await api.query.session.validators((validators)=>{
      console.log(`validators ${validators}`)
      const sessionValidators = validators.map(x=> x.toString())
      this.setState({validators: sessionValidators})
    });
    
  }
  componentWillMount(){

  }
  
  render() {
    const arr = this.state.validators;
    return (
      <div className="container">
        {console.log(this.state.validators.indexOf(this.state.lastAuthor))}
        
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
                  val={this.state.validators[index]}
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
                <BlockAnimation
                key={this.state.validators.indexOf(this.state.lastAuthor)}
                angle={180 - (this.state.validators.indexOf(this.state.lastAuthor) * 360) / arr.length}
                x1={
                  window.innerWidth/2 +
                  118 *
                    Math.cos((90 - (this.state.validators.indexOf(this.state.lastAuthor) * 360) / arr.length) * 0.0174533)
                }
                y1={
                  window.innerHeight/2 +
                  118 *
                    Math.sin((90 - (this.state.validators.indexOf(this.state.lastAuthor) * 360) / arr.length) * 0.0174533)
                }
                x2={
                  window.innerWidth/2 +
                  170 *
                    Math.cos((90 - (this.state.validators.indexOf(this.state.lastAuthor) * 360) / arr.length) * 0.0174533)
                }
                y2={
                  window.innerHeight/2 +
                  170 *
                    Math.sin((90 - (this.state.validators.indexOf(this.state.lastAuthor) * 360) / arr.length) * 0.0174533)
                }
              />
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

export default App;
