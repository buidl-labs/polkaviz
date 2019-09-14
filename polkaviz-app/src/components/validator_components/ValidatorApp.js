import React from "react";
import { Stage, Layer, Arc, Line, Rect, Text } from "react-konva";
import WhiteCircles from "./WhiteCircles";
// import { WsProvider, ApiPromise } from "@polkadot/api";
import { withRouter } from 'react-router-dom';

class ValidatorApp extends React.Component {
  constructor() {
    super();
    this.state = {
      validator: "",
      nominators: [],
      showValidatorAddress: false,
      showdifferent:true,
      stash:"",
      controller: "",
      isloading:true
    };

this.totalvalue =0 
this.ownvalue = 0
  }

  componentDidMount() {
    console.log(this.props)
    this.createApi();
    console.log("this",this.props.match.params.validatorAddress);
  }

  async createApi() {
    // const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
    // const api = await ApiPromise.create(provider);

    // const stakers = await api.derive.staking.info(this.props.match.params.validatorAddress);
    // 5FbuxWQuCd3N9kosfTXY1v63xV5bNfSpNutuRvERAWm6fmzt
    // console.log(JSON.stringify(stakers));
    // const value = JSON.parse(stakers);
    const value = this.props.location.state.valinfo
    this.totalvalue = value.stakers.total / Math.pow(10,15)
    this.ownvalue = value.stakers.own /Math.pow(10,15)
    if(value.stashId===value.controllerId)
    {
        this.setState({
            showdifferent:false
        })
    }
    this.setState({
      validator: value.accountId,
      nominators: value.stakers.others,
      stash: value.stashId,
      controller: value.controllerId,
      isloading:false
    });
    // console.log(value.stakers.others.length);
  }

  handleOnMouseOver = () => {
    this.setState({showValidatorAddress: true})
  }
  handleOnMouseOut = () => {
    this.setState({showValidatorAddress: false})
  }


  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let radius = 100;


    let validatorname = "Validator: " +  this.state.validator
    let stashname= this.state.stash.toString().slice(0,8) + "......" + this.state.stash.toString().slice(-8)
    let diffrentstash = "session: " + stashname
    let controllername = this.state.controller.toString().slice(0,8) + "......" + this.state.controller.toString().slice(-8)
    let diffrentcontroller = "controller: " + controllername
    if (this.state.nominators.length > 10) {
      radius = 200;
    }
    let totalbonded = 0
    // this.state.nominators.forEach(ele => {
    //     totalbonded +=ele.value
    // })
    // console.log(this.totalvalue,this.ownvalue+totalbonded)
    totalbonded = this.totalvalue.toFixed(3)-this.ownvalue.toFixed(3)
    let bondvalue = "bonded: " + this.ownvalue.toString().slice(0,5) + " (+ " + totalbonded.toString().slice(0,5) +" ) DOT"
    // console.log(this.state)
    return (
  this.state.isloading ? (<React.Fragment><div className="lds-ripple"><div></div><div></div></div><div className="lds-text" style={{left:"42%"}}>Fetching Nominators.....</div></React.Fragment>) : 
      (
      <div>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {/* Here n is number of white circles to draw
                        r is radius of the imaginary circle on which we have to draw white circles
                        x,y is center of imaginary circle 
                     */}

            <WhiteCircles
              n={this.state.nominators.length}
              r={radius}
              x={width / 2 + 10}
              y={height / 2 + 5}
              nominators={this.state.nominators}
              history={this.props.history}
              totalinfo={this.props.location.state.totalinfo}
              valinfo={this.props.location.state.valinfo}
            />

            {/* Arc used to create the semicircle on the right, 
                    Rotation is used to rotate the arc drawn by 90 degrees in clockwise direction
                */}
            <Arc
              x={width - 2}
              y={height / 2}
              innerRadius={height / 2 - 25}
              outerRadius={height / 2 - 24}
              rotation={90}
              angle={180}
              stroke="white"
            />
            {/* Adding 6 to stating and ending y point and 24 to length of line
                    because the upper left corner of rectangle is at width/2,height/2
                    so mid point of rectangle becomes width/2+12,height/2+6
                 */}
            <Line
              points={[
                width / 2,
                height / 2 + 6,
                width - height / 2 + 24,
                height / 2 + 6
              ]}
              fill="white"
              stroke="white"
              opacity={0.2}
            />

            <Rect
              x={width / 2}
              y={height / 2}
              width={24}
              height={12}
              fill="purple"
              cornerRadius={10}
              onMouseOver={this.handleOnMouseOver}
              onMouseOut={this.handleOnMouseOut}
            />

            {this.state.showValidatorAddress && <Text text={this.state.validator} x={width/2+10} y={height/2-20} fill="#FFFFFF" />}
            <Text text={validatorname} x= {width/30} y={height/30} fill="#FFFFFF" fontSize={20}/>
            <Text text={diffrentcontroller} x={width/30} y={height-height/30} fill="#FFFFFF" fontSize={17} />
            <Text text ={diffrentstash} x={width/4+60} y={height-height/30} fill="#FFFFFF" fontSize={17} />
            <Text text={bondvalue} x={width/2} y={height-height/30} fill="#FFFFFF" fontSize={17} />
          </Layer>
        </Stage>
      </div>
      )
    );
  }
}

export default withRouter(ValidatorApp);
