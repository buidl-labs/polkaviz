import React from "react";
import Relay from "../Relay";
import { Stage, Layer } from "react-konva";
import Validator from "../Validator";
import BlockAnimation from "./BlockAnimation";
// import { WsProvider, ApiPromise } from "@polkadot/api";
import Bottombar from "../Bottombar";
import { withRouter } from 'react-router-dom';
// import Parachains from './Parachains'

class App extends React.Component {
  shouldComponentUpdate(nextProps, nextState){
    return this.props.lastAuthor !== nextProps.lastAuthor || this.props.bottombarobject !== nextProps.bottombarobject
}
  render() {
    let arr = this.props.validators;
    if(this.props.validatorsandintentions.length !== 0 ){
    arr = this.props.validatorsandintentions;
        }    // console.log(arr)
    const intentionsarr = this.props.intentions
    console.log(this.props.validatorsandintentions)
    // console.log(this.props.lastAuthor,this.props.validators,this.props.valtotalinfo)
    // console.log(this.props.validators.indexOf(this.props.lastAuthor))
    // const validatortext = "Validators: " + this.props.validators.length + "/" + this.props.totalvalidators
    // const arr1 = [1,2,3,4,5,6,7,8]
    return (
      // this.props.validatorsandintentions.length === 0 ? (<React.Fragment><div className="lds-ripple"><div></div><div></div></div></React.Fragment>) : 
      // (
      <div className="container">

        <div className="heading">
          <h2>Polkadot Network</h2>
        </div>

        <div className="intentions">
          <div>Next Up:</div>
          {intentionsarr.length === 0 ? <div className="inten">no addresses found</div> :
          intentionsarr.map((ele,index) => {
            return (
            <div className="inten" key={index}>
              <span className="valsign"></span>
              {ele.toString().slice(0,8) + "......" + ele.toString().slice(-8)}
            </div>
            )
          })
          }
        </div>

        <div className="relay-circle">
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
            {/* <Parachains x={window.innerWidth} y={window.innerHeight} parachains={arr1}/> */}
              {/*in  (90 - 1) "-1"  is to handle the deviation of hexagon wrt to validators */}
              {arr.map((person, index) => (
                <Validator
                  key={index}
                  validatorAddress={this.props.validatorsandintentions ? person.valname : undefined}
                  valinfo={this.props.validatorsandintentions ? person.valinfo : undefined}
                  totalinfo={this.props.validatorsandintentions ? this.props.valtotalinfo : undefined}
                  nominatorinfo={this.props.validatorsandintentions ? this.props.nominatorinfo : undefined}
                  angle={180 - (index * 360) / arr.length}
                  history={this.props.history}
                  intentions={this.props.intentions}
                  x={
                    window.innerWidth +
                    360 *
                      Math.cos((90 - 1 - (index * 360) / arr.length) * 0.0174533)
                  }
                  y={
                    window.innerHeight +
                    360 *
                      Math.sin((90 - 1 - (index * 360) / arr.length) * 0.0174533)
                  }
                />
              ))}
              {/* {console.log(this.props.bottombarobject.finalblock)}
              {console.log(this.props.previousBlock)} */}
              {this.props.previousBlock !== undefined && <BlockAnimation
                key={this.props.validators.indexOf(this.props.lastAuthor)}
                angle={
                  180 -
                  (this.props.validators.indexOf(this.props.lastAuthor) * 360) /
                    arr.length
                }
                x1={
                  window.innerWidth / 2 +
                  100 *
                    Math.cos(
                      (90 -
                        (this.props.validators.indexOf(this.props.lastAuthor) *
                          360) /
                          arr.length) *
                        0.0174533
                    )
                }
                y1={
                  window.innerHeight / 2 +
                  100 *
                    Math.sin(
                      (90 -
                        (this.props.validators.indexOf(this.props.lastAuthor) *
                          360) /
                          arr.length) *
                        0.0174533
                    )
                }
                x2={
                  window.innerWidth / 2 +
                  160 *
                    Math.cos(
                      (90 -
                        (this.props.validators.indexOf(this.props.lastAuthor) *
                          360) /
                          arr.length) *
                        0.0174533
                    )
                }
                y2={
                  window.innerHeight / 2 +
                  160 *
                    Math.sin(
                      (90 -
                        (this.props.validators.indexOf(this.props.lastAuthor) *
                          360) /
                          arr.length) *
                        0.0174533
                    )
                }
              />}
              <Relay x={window.innerWidth} y={window.innerHeight} />
              
            </Layer>
          </Stage>
        </div>
        <div className="bottombar">
          <Bottombar start={this.props.start} activevalidators={this.props.validators.length} validatorcount={this.props.validatorcount} bottombarobject ={this.props.bottombarobject}/>
        </div>
      </div>

      // )
    );
  }
}

export default withRouter(App);
