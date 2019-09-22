import React from "react";
import { Stage, Layer, Arc, Line, Rect, Text} from "react-konva";
import WhiteCircles from "./WhiteCircles";
// import { WsProvider, ApiPromise } from "@polkadot/api";
import { withRouter } from 'react-router-dom';
import ValBottombar from './ValBottombar'

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
      isloading:true,
      totalinfo:[],
      valinfo:{}
    };

this.totalvalue =0 
this.ownvalue = 0
  }

  componentDidMount() {
    console.log("val",this.props)
    this.createApi();
    console.log("this",this.props.match.params.validatorAddress);
  }

  async createApi() {
    // const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
    // const api = await ApiPromise.create(provider);

    // const stakers = await api.derive.staking.info(this.props.match.params.validatorAddress);
    // 5FbuxWQuCd3N9kosfTXY1v63xV5bNfSpNutuRvERAWm6fmzt
    // console.log(JSON.stringify(stakers));
    // const value = JSON.parse(stakers);http://localhost:3000/val/5E27gZXVEkwLWjaCwmt9dC2sEgbdLEUZUPrxkg6BvG5RKpwW
    // let value = this.props.location.state.valinfo
    let value = ""
    this.props.valtotalinfo.forEach(ele => {
      if(ele.valinfo.accountId.toString() === this.props.match.params.validatorAddress.toString())
      {
        value = ele.valinfo
      }
    })
console.log("huyi",value)
let totalinfo = this.props.valtotalinfo
    // if(!this.props.location.state.totalinfo){
    //   totalinfo = this.props.valtotalinfo      
    // }
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
      isloading:false,
      valinfo:value,
      totalinfo:totalinfo
    });
    // console.log(value.stakers.others.length);
  }

  handleOnMouseOver = () => {
    this.setState({showValidatorAddress: true})
  }
  handleOnMouseOut = () => {
    this.setState({showValidatorAddress: false})
  }


  BackbtnhandleOnMouseOver = () => {
    document.body.style.cursor = "pointer";
  }
  BackbtnhandleOnMouseOut = () => {
    document.body.style.cursor = "default";
  }

  handleClick = () => {
    document.body.style.cursor = "default";
    this.props.history.push({
      pathname:"/",
      state:{totalinfo:this.props.totalinfo,
      valinfo:this.props.valinfo,
      // nominatorinfo:this.props.nominatorinfo
    }
  })
}

  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let radius = 120;


    let validatorname = "Validator Address: " +  this.state.validator


    let totalbondedtext = "total staked: " + this.totalvalue.toFixed(3) + " DOT"
    let selfbondedtext = "validator self stake: " + this.ownvalue.toString().slice(0,5) + " DOT"

    let totalbonded = 0
    totalbonded = this.totalvalue.toFixed(3)-this.ownvalue.toFixed(3)
    let nominatorbondedtext = "nominator stake: " +  totalbonded.toString().slice(0,5) + " DOT"
    if (this.state.nominators.length > 10) {
      radius = 200;
    }
    

    let valaddress = this.state.validator.toString().slice(0,8) + "......" + this.state.validator.toString().slice(-8)

    return (
  this.state.isloading ? (<React.Fragment><div className="lds-ripple"><div></div><div></div></div></React.Fragment>) : 
      (
      <div>
        <div className="back-arrow" onClick={this.handleClick} onMouseOver={this.BackbtnhandleOnMouseOver} onMouseOut={this.BackbtnhandleOnMouseOut}>
         &#8592;
        </div>
        <div className="valheading">
          <h2>{validatorname}</h2>
        </div>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {/* Here n is number of white circles to draw
                        r is radius of the imaginary circle on which we have to draw white circles
                        x,y is center of imaginary circle 
                     */}

            <WhiteCircles
              n={this.state.nominators.length}
              r={radius}
              x={width / 2 + 13}
              y={height / 2 + 6}
              nominators={this.state.nominators}
              history={this.props.history}
              totalinfo={this.state.totalinfo}
              valinfo={this.state.valinfo}
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
              stroke="#97A1BF"
              strokeWidth={4}
            />
            {/* Adding 6 to stating and ending y point and 24 to length of line
                    because the upper left corner of rectangle is at width/2,height/2
                    so mid point of rectangle becomes width/2+12,height/2+6
                 */}
            <Line
              points={[
                width / 2,
                height / 2 + 6,
                width - height / 2 + 23,
                height / 2 + 6
              ]}
              fill="white"
              stroke="white"
              opacity={0.3}
            />

            <Rect
              x={width / 2}
              y={height / 2}
              width={26}
              height={12}
              fill="purple"
              cornerRadius={10}
              onMouseOver={this.handleOnMouseOver}
              onMouseOut={this.handleOnMouseOut}
            />

{/* 
              <Shape 
                  sceneFunc={(context, shape) => {
                    context.beginPath();
                    context.moveTo(63, 39);
                    context.lineTo(92, 39);
                    context.moveTo(63, 39);
                    context.lineTo(72, 29);
                    context.moveTo(63, 39);
                    context.lineTo(72, 49);
                    // context.quadraticCurveTo(150, 100, 260, 170);
                    // context.closePath();
                    // (!) Konva specific method, it is very important
                    context.fillStrokeShape(shape);
                  }}
                  fill="#00D2FF"
                  stroke="white"
                  strokeWidth={2}
                  onMouseOver={this.BackbtnhandleOnMouseOver}
                  onMouseOut={this.BackbtnhandleOnMouseOut}
                  onClick={this.handleClick}
                  /> */}

            {this.state.showValidatorAddress && <Text text={valaddress} x={width/2+10} y={height/2-20} fill="#FFFFFF" />}
            {/* <Text text={validatorname} x= {68} y={71} fill="#FFFFFF" fontSize={20}/> */}
            {/* <Text text={totalbondedtext} x={width/30} y={height-height/30} fill="#FFFFFF" fontSize={17} />
            <Text text ={selfbondedtext} x={width/4+60} y={height-height/30} fill="#FFFFFF" fontSize={17} />
            <Text text={nominatorbondedtext} x={width/2} y={height-height/30} fill="#FFFFFF" fontSize={17} /> */}
          </Layer>
        </Stage>
              <div className="valbottombar">
                <ValBottombar totalbondedtext={totalbondedtext} selfbondedtext={selfbondedtext} nominatorbondedtext={nominatorbondedtext} />
              </div>

      </div>
      )
    );
  }
}

export default withRouter(ValidatorApp);
