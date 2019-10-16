import React from "react";
import { Stage, Layer, Arc, Line, Rect, Text } from "react-konva";
import WhiteCircles from "./WhiteCircles";
import { withRouter } from "react-router-dom";
import ValBottombar from "./ValBottombar";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import { WsProvider, ApiPromise } from "@polkadot/api";


class ValidatorApp extends React.Component {
  constructor() {
    super();
    this.state = {
      validator: "",
      nominators: [],
      showValidatorAddress: false,
      stash: "",
      controller: "",
      isloading: true,
      totalinfo: [],
      valinfo: {},
      copied: false
    };
    this.ismounted = false;
    this.totalvalue = 0;
    this.ownvalue = 0;
  }

  componentDidMount() {
    this.ismounted = true;
    console.log("val",this.props)
    // this.createApi();
    // console.log("this",this.props.match.params.validatorAddress);
    // if(!this.props.history.location.state){
    //   console.log("HI")
    //   // this.createApi()
    // }
  }
  shouldComponentUpdate(nextProps,nextState){
    if(this.props.validatorandintentionloading === nextProps.validatorandintentionloading && this.props.validatorsandintentions === nextProps.validatorsandintentions && this.state.copied === nextState.copied){
      return false
    }
    else {
      return true
    }
  }


  handleOnMouseOver = () => {
    this.setState({ showValidatorAddress: true });
  };
  handleOnMouseOut = () => {
    this.setState({ showValidatorAddress: false });
  };

  BackbtnhandleOnMouseOver = () => {
    document.body.style.cursor = "pointer";
  };
  BackbtnhandleOnMouseOut = () => {
    document.body.style.cursor = "default";
  };

  BackbtnhandleClick = () => {
    document.body.style.cursor = "default";
    this.props.history.push({
      pathname: "/alexander",
      state: { totalinfo: this.props.totalinfo, valinfo: this.props.valinfo }
    });
  };
  homebtnhandleClick = () => {
    document.body.style.cursor = "default";
    this.props.history.push({
      pathname: "/",
      state: { totalinfo: this.props.totalinfo, valinfo: this.props.valinfo }
    });
  };
  onCopy = () => {
    console.log("youp",this.ismounted)
    if(this.ismounted){
    this.setState({ copied: true }, () =>
{    console.log("copied state set")
    setInterval(() => {
        this.setState({ copied: false });
      }, 3000)
    ;
  
    }
    )};
}

  componentWillUnmount(){
    this.ismounted = false
  }
  render() {
    console.log(this.props.history.location.pathname.split("/")[3])
    const width = window.innerWidth;
    const height = window.innerHeight;
    let radius = 120;


    let value = "";
    let validator = "";
    let nominators = "";
    // let stash = "";
    // let controller = "";
    let valinfo ="";
    let totalinfo = "";
    if(!this.props.validatorandintentionloading){
      console.log(this.props.validatorsandintentions)
    this.props.validatorsandintentions.forEach(ele => {
      if (
        ele.valinfo.accountId.toString() ===
        this.props.history.location.pathname.split("/")[3].toString()
      ) {
        value = ele.valinfo;
      }
    });
    console.log("huyi",value)
    totalinfo = this.props.valtotalinfo;
    this.totalvalue = value.stakers.total / Math.pow(10, 15);
    this.ownvalue = value.stakers.own / Math.pow(10, 15);
      validator= value.accountId
      nominators = value.stakers.others
      // stash = value.stashId
      // controller = value.controllerId
      valinfo = value
    if(this.props.intentions.includes(this.props.history.location.pathname.split("/")[3].toString())){
      console.log("yo")
      this.totalvalue = value.stakingLedger.total
      this.ownvalue = value.stakingLedger.total
    }
  }

  



    let validatorname =
      "Validator Address: " +
      validator.toString().slice(0, 8) +
      "......" +
      validator.toString().slice(-8);

    let totalbondedtext =
      "total staked: " + this.totalvalue.toFixed(3) + " DOT";
    let selfbondedtext =
      "validator self stake: " + this.ownvalue.toString().slice(0, 5) + " DOT";

    let totalbonded = 0;
    totalbonded = this.totalvalue.toFixed(3) - this.ownvalue.toFixed(3);
    let nominatorbondedtext =
      "nominator stake: " + totalbonded.toString().slice(0, 5) + " DOT";
    if (this.state.nominators.length > 10) {
      radius = 200;
    }
    let opacity = 0.3
    let color = "purple"
    if(this.props.intentions.includes(this.props.history.location.pathname.split("/")[3].toString())){
      opacity = 0
      color = "yellow"
    }

    return this.props.validatorandintentionloading ? (
      <React.Fragment>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </React.Fragment>
    ) : (
      <div>
        <div
          className="back-arrow"
          onClick={this.BackbtnhandleClick}
          onMouseOver={this.BackbtnhandleOnMouseOver}
          onMouseOut={this.BackbtnhandleOnMouseOut}
        >
          &#8592;
        </div>
        {/* <div className="home"
            onClick={this.homebtnhandleClick}
            onMouseOver={this.BackbtnhandleOnMouseOver}
            onMouseOut={this.BackbtnhandleOnMouseOut}>
              &#127963;
        </div> */}
        <div className="valheading">
          <h2>{validatorname}</h2>
          <CopyToClipboard text={validator} onCopy={this.onCopy}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 226 226"
              >
                <g
                  fill="none"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  >
                  <path d="M0,226v-226h226v226z" fill="none"></path>
                  <g fill="#ffffff">
                    <path d="M37.66667,18.83333c-10.40542,0 -18.83333,8.42792 -18.83333,18.83333v131.83333h18.83333v-131.83333h131.83333v-18.83333zM75.33333,56.5c-10.40542,0 -18.83333,8.42792 -18.83333,18.83333v113c0,10.40542 8.42792,18.83333 18.83333,18.83333h113c10.40542,0 18.83333,-8.42792 18.83333,-18.83333v-113c0,-10.40542 -8.42792,-18.83333 -18.83333,-18.83333zM75.33333,75.33333h113v113h-113z"></path>
                  </g>
                </g>
              </svg>
            </span>
          </CopyToClipboard>
        </div>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {this.state.copied && (
              <Text text="copied" x={700} y={75} fill="green" fontSize={18}/>
            )}
            {/* Here n is number of white circles to draw
                        r is radius of the imaginary circle on which we have to draw white circles
                        x,y is center of imaginary circle 
                     */}

            <WhiteCircles
              n={nominators.length}
              r={radius}
              x={width / 2 + 13}
              y={height / 2 + 6}
              nominators={nominators}
              history={this.props.history}
              totalinfo={totalinfo}
              valinfo={valinfo}
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
              opacity={opacity}
            />

            <Rect
              x={width / 2}
              y={height / 2}
              width={26}
              height={12}
              fill={color}
              cornerRadius={10}
              onMouseOver={this.handleOnMouseOver}
              onMouseOut={this.handleOnMouseOut}
            />
          </Layer>
        </Stage>
        <div className="valbottombar">
          <ValBottombar
            totalbondedtext={totalbondedtext}
            selfbondedtext={selfbondedtext}
            nominatorbondedtext={nominatorbondedtext}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ValidatorApp);
