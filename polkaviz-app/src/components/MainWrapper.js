import React from "react";
import Relay from "./Relay";
import { Stage, Layer } from "react-konva";
import Validator from "./Validator";
import BlockAnimationNew from "./kusama/BlockAnimation-new";
import { withRouter } from "react-router-dom";

class MainWrapper extends React.Component {
  // constructor() {
  //   super();
  //   this.latestBlockAuthor = undefined;
  //   this.state = {
  //     validators: [],
  //     lastAuthor: "",
  //     start: null,
  //     isloading:true,
  //     valtotalinfo:[]
  //   };
  //   this.ismounted = true
  // }

  componentDidMount() {
    if (!this.props.valtotalinfo) {
      this.props.createApi();
    }
  }

  handleOnMouseOver = () => {
    document.body.style.cursor = "pointer";
  }
  handleOnMouseOut = () => {
    document.body.style.cursor = "default";
   }
  alexanderClick = () => {
    document.body.style.cursor = "default";
    this.props.history.push({
      pathname:"/alexander",
      state:{totalinfo:this.props.totalinfo,
      valinfo:this.props.valinfo,
    }
}
  )}
  kusamaClick = () => {
    document.body.style.cursor = "default";
    this.props.history.push({
      pathname:"/kusama",
      state:{totalinfo:this.props.totalinfo,
      valinfo:this.props.valinfo,
    }
}
  )}

  render() {
    const arr = this.props.valtotalinfo;
    const arr2 = this.props.kuvaltotalinfo;
    // const validatortext = "Validators: " + this.props.validators.length + "/" + this.props.totalvalidators
    // const arr1 = [1,2,3,4,5,6,7,8]
    return (
      // this.props.isloading ? (<React.Fragment><div className="lds-ripple"><div></div><div></div></div><div className="lds-text">Waiting for API to be connected.....</div></React.Fragment>) :
      // (
      <div className="mainWrapper">
        
        <div className="container">
          <div className="heading">
            <h2>Polkadot Network</h2>
          </div>
          <div className="relay-circle">
            <Stage width={window.innerWidth/2} height={window.innerHeight} onClick={this.alexanderClick} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut} >
              
              <Layer>
                {/* <Parachains x={window.innerWidth} y={window.innerHeight} parachains={arr1}/> */}
                {/*in  (90 - 1) "-1"  is to handle the deviation of hexagon wrt to validators */}
                {arr.map((person, index) => (
                  <Validator
                    key={index}
                    validatorAddress={this.props.valtotalinfo[index].valname}
                    valinfo={this.props.valtotalinfo[index].valinfo}
                    totalinfo={this.props.valtotalinfo}
                    nominatorinfo={this.props.nominatorinfo}
                    angle={180 - (index * 360) / arr.length}
                    history={this.props.history}
                    x={
                      window.innerWidth/2 +
                      360 *
                        Math.cos(
                          (90 - 1 - (index * 360) / arr.length) * 0.0174533
                        )
                    }
                    y={
                      window.innerHeight +
                      360 *
                        Math.sin(
                          (90 - 1 - (index * 360) / arr.length) * 0.0174533
                        )
                    }
                    isMainWrapper={true}
                  />
                ))}
                {/* {console.log(this.props.bottombarobject.finalblock)}
              {console.log(this.props.previousBlock)} */}
                {this.props.previousBlock !== undefined && (
                  <BlockAnimationNew
                    key={this.props.validators.indexOf(this.props.lastAuthor)}
                    angle={
                      180 -
                      (this.props.validators.indexOf(this.props.lastAuthor) *
                        360) /
                        arr.length
                    }
                    x1={
                      window.innerWidth / 4 +
                      100 *
                        Math.cos(
                          (90 -
                            (this.props.validators.indexOf(
                              this.props.lastAuthor
                            ) *
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
                            (this.props.validators.indexOf(
                              this.props.lastAuthor
                            ) *
                              360) /
                              arr.length) *
                            0.0174533
                        )
                    }
                    x2={
                      window.innerWidth / 4 +
                      160 *
                        Math.cos(
                          (90 -
                            (this.props.validators.indexOf(
                              this.props.lastAuthor
                            ) *
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
                            (this.props.validators.indexOf(
                              this.props.lastAuthor
                            ) *
                              360) /
                              arr.length) *
                            0.0174533
                        )
                    }
                  />
                )}
                <Relay x={window.innerWidth/2} y={window.innerHeight} />
              </Layer>
            </Stage>
          </div>
          {/* <div className="bottombar">
            <Bottombar
              start={this.props.start}
              activevalidators={this.props.validators.length}
              validatorcount={this.props.validatorcount}
              bottombarobject={this.props.bottombarobject}
            />
          </div> */}
        </div>
        <div className="right-stage">
          {/* <p>HI i am shaurya</p>
          <Stage width={window.innerWidth/2} height={window.innerHeight} x={700}>
          <Layer>
            <Rect x={700} y={0} width={100} height={100} fill={"#9335A3"}/>
          </Layer>
        </Stage>
         */}
         <Stage width={window.innerWidth/2} height={window.innerHeight} onClick={this.kusamaClick} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut} >
              
              <Layer>
                {/* <Parachains x={window.innerWidth} y={window.innerHeight} parachains={arr1}/> */}
                {/*in  (90 - 1) "-1"  is to handle the deviation of hexagon wrt to validators */}
                {arr2.map((person, index) => (
                  <Validator
                    key={index}
                    validatorAddress={this.props.kuvaltotalinfo[index].valname}
                    valinfo={this.props.kuvaltotalinfo[index].valinfo}
                    totalinfo={this.props.kuvaltotalinfo}
                    nominatorinfo={this.props.kunominatorinfo}
                    angle={180 - (index * 360) / arr2.length}
                    history={this.props.history}
                    x={
                      window.innerWidth/2 +
                      360 *
                        Math.cos(
                          (90 - 1 - (index * 360) / arr2.length) * 0.0174533
                        )
                    }
                    y={
                      window.innerHeight +
                      360 *
                        Math.sin(
                          (90 - 1 - (index * 360) / arr2.length) * 0.0174533
                        )
                    }
                    isMainWrapper={true}
                  />
                ))}
                {/* {console.log(this.props.bottombarobject.finalblock)}
              {console.log(this.props.previousBlock)} */}
                {this.props.kupreviousBlock !== undefined && (
                  <BlockAnimationNew
                    key={this.props.kuvalidators.indexOf(this.props.kulastAuthor)}
                    angle={
                      180 -
                      (this.props.kuvalidators.indexOf(this.props.kulastAuthor) *
                        360) /
                        arr2.length
                    }
                    x1={
                      window.innerWidth / 4 +
                      100 *
                        Math.cos(
                          (90 -
                            (this.props.kuvalidators.indexOf(
                              this.props.kulastAuthor
                            ) *
                              360) /
                              arr2.length) *
                            0.0174533
                        )
                    }
                    y1={
                      window.innerHeight / 2 +
                      100 *
                        Math.sin(
                          (90 -
                            (this.props.kuvalidators.indexOf(
                              this.props.kulastAuthor
                            ) *
                              360) /
                              arr2.length) *
                            0.0174533
                        )
                    }
                    x2={
                      window.innerWidth / 4 +
                      160 *
                        Math.cos(
                          (90 -
                            (this.props.kuvalidators.indexOf(
                              this.props.kulastAuthor
                            ) *
                              360) /
                              arr2.length) *
                            0.0174533
                        )
                    }
                    y2={
                      window.innerHeight / 2 +
                      160 *
                        Math.sin(
                          (90 -
                            (this.props.kuvalidators.indexOf(
                              this.props.kulastAuthor
                            ) *
                              360) /
                              arr2.length) *
                            0.0174533
                        )
                    }
                  />
                )}
                <Relay x={window.innerWidth/2} y={window.innerHeight} isKusama={true}/>
              </Layer>
            </Stage>
          </div>
        </div>
      // )
    );
  }
}

export default withRouter(MainWrapper);