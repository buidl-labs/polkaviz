import React from "react";
import Relay from "./Relay";
import { Stage, Layer } from "react-konva";
import Validator from "./Validator";
import BlockAnimation from "./alexander/BlockAnimation";
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
    // if (!this.props.valtotalinfo) {
    //   this.props.createApi();
    // }
  }

  handleOnMouseOverstage1 = () => {
    document.body.style.cursor = "pointer";
    // document.getElementById("alexanderRelay").setAttrs({
    //   scaleX:1.1,
    //   scaleY:1.1
    // })
  }
  handleOnMouseOverstage2 = () => {
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
    let arr = this.props.validators;
    if(this.props.validatorsandintentions.length !== 0 ){
    arr = this.props.validatorsandintentions;
    console.log("intentions are loaded")
        }
    const arr2 = this.props.kusamavalidators;
    // const validatortext = "Validators: " + this.props.validators.length + "/" + this.props.totalvalidators
    // const arr1 = [1,2,3,4,5,6,7,8]
    return (
      // this.props.isloading ? (<React.Fragment><div className="lds-ripple"><div></div><div></div></div><div className="lds-text">Waiting for API to be connected.....</div></React.Fragment>) :
      // (
        <div>
          <div className="mainwrapper-text">
            <h1>Polkaviz</h1>
            <h2>Visualization efforts on Polkadot Network</h2>
          </div>
      <div className="mainWrapper">
        
        <div className="container">
          <div className="headingmainwrapper1">
            <h2>Alexander Network</h2>
          </div>
          <div className="relay-circle">
            {this.props.isloading ? <p className="alexanderconnecting">Please wait while we connect to alexander network</p>:
            <Stage width={window.innerWidth/2} height={window.innerHeight} onClick={this.alexanderClick} onMouseOver={this.handleOnMouseOverstage1} onMouseOut={this.handleOnMouseOut} >
              
              <Layer>
                {/* <Parachains x={window.innerWidth} y={window.innerHeight} parachains={arr1}/> */}
                {/*in  (90 - 1) "-1"  is to handle the deviation of hexagon wrt to validators */}
                {arr.map((person, index) => (
                  <Validator
                    key={index}
                    validatorAddress={this.props.validatorsandintentions ? person.valname : undefined}
                    valinfo={this.props.validatorsandintentions ? person.valinfo : undefined}
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
                      window.innerHeight -200 +
                      360 *
                        Math.sin(
                          (90 - 1 - (index * 360) / arr.length) * 0.0174533
                        )
                    }
                    isMainWrapper={true}
                    intentions={this.props.intentions}
                  />
                ))}
                {/* {console.log(this.props.bottombarobject.finalblock)}
              {console.log(this.props.previousBlock)} */}
                {this.props.previousBlock !== undefined && (
                  <BlockAnimation
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
                      window.innerHeight / 2  - 100 +
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
                      window.innerHeight / 2 -100 +
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
                <Relay x={window.innerWidth/2} y={window.innerHeight - 200} id="alexanderRelay"/>
              </Layer>
            </Stage>
            }
          </div>
        </div>



        <div className="right-stage">
        {this.props.kusamaisloading ? <p className="kusamaconnecting">Please Wait while we connect to Kusama Network</p>:
        <React.Fragment>
        <div className="headingmainwrapper2">
            <h2>Kusama Network</h2>
          </div>
         <Stage width={window.innerWidth/2} height={window.innerHeight - 200} onClick={this.kusamaClick} onMouseOver={this.handleOnMouseOverstage2} onMouseOut={this.handleOnMouseOut} >
              <Layer>
                {/* <Parachains x={window.innerWidth} y={window.innerHeight} parachains={arr1}/> */}
                {/*in  (90 - 1) "-1"  is to handle the deviation of hexagon wrt to validators */}
                {arr2.map((person, index) => (
                  <Validator
                    key={index}
                    // validatorAddress={this.props.kuvaltotalinfo[index].valname}
                    // valinfo={this.props.kuvaltotalinfo[index].valinfo}
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
                      window.innerHeight - 200 +
                      360 *
                        Math.sin(
                          (90 - 1 - (index * 360) / arr2.length) * 0.0174533
                        )
                    }
                    isMainWrapper={true}
                    isKusama={true}
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
                      window.innerHeight / 2 -100 +
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
                      window.innerHeight / 2 -100 +
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
                <Relay x={window.innerWidth/2} y={window.innerHeight-200} isKusama={true}/>
              </Layer>
            </Stage>
            </React.Fragment>
        }
          </div>
        </div>
        </div>
      // )
    );
  }
}

export default withRouter(MainWrapper);