import React from "react";
import { Stage, Layer, Arc, Circle, Text } from "react-konva";
import Validators from "./Validators";
import { withRouter } from "react-router-dom";
import NomBottombar from "./NomBottombar";
import { CopyToClipboard } from "react-copy-to-clipboard";


class NominatorApp extends React.Component {
  constructor() {
    super();
    this.latestBlockAuthor = undefined;
    this.state = {
      showValidatorAddress: false,
      copied:false
    };
    this.ismounted = true;
  }
  componentDidMount() {
    // console.log("nom",this.props)
    // this.start();
    // this.createApi()
  }

  // start() {
  //   let arr1 = [];
  //   let bonded = 0;

  //   this.props.valtotalinfo.forEach(ele => {
  //     ele.valinfo.stakers.others.forEach(nom => {
  //       if (nom.who === this.props.match.params.nominatorAddress) {
  //         arr1.push({validator:ele,
  //         staked:nom.value / Math.pow(10, 15)});
  //         bonded += nom.value / Math.pow(10, 15);
  //       }
  //     });
  //   });


  //   let nominatorvalue = "";
  //   this.props.nominatorinfo.forEach(ele => {
  //     if (ele.accountId === this.props.match.params.nominatorAddress) {
  //       nominatorvalue = ele.controllerId;
  //     }
  //   });

  //   // console.log("Done",nominatorvalue);
  //   // console.log(arr1);
  //   if (this.ismounted) {
  //     this.setState(
  //       {
  //         valbacked: arr1,
  //         totalbonded: bonded,
  //         controllerId: nominatorvalue
  //       },
  //       () => {
  //         this.setState({ isloading: false });
  //       }
  //     );
  //   }
  // }

  componentWillUnmount() {
    this.ismounted = false;
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
    this.setState({ copied: true }, () =>
      setInterval(() => {
        this.setState({ copied: false });
      }, 3000)
    );
  };

  handlePolkavizClick = () => {
    document.body.style.cursor = "default";
    this.props.history.push({
      pathname:"/",
  })
  }

  handleAlexanderClick = () => {
    document.body.style.cursor = "default";
    this.props.history.push({
      pathname:"/alexander",
  })
  }


  render() {

    let arr1 = [];
    let bonded = 0;
    let valbacked = [];
    let totalbonded = 0;
    let controllerId = "";
    if(!this.props.validatorandintentionloading){
    this.props.valtotalinfo.forEach(ele => {
      ele.valinfo.stakers.others.forEach(nom => {
        if (nom.who === this.props.history.location.pathname.split("/")[3].toString()) {
          arr1.push({validator:ele,
          staked:nom.value / Math.pow(10, 15)});
          bonded += nom.value / Math.pow(10, 15);
        }
      });
    });


    let nominatorvalue = "";
    this.props.nominatorinfo.forEach(ele => {
      if (ele.accountId === this.props.history.location.pathname.split("/")[3].toString()) {
        nominatorvalue = ele.controllerId;
      }
    });

    // console.log("Done",nominatorvalue);
    // console.log(arr1);
          valbacked= arr1
          totalbonded= bonded
          controllerId= nominatorvalue

  }
    // console.log("nomvalue",this.state.nominatorvalue)
    let nominatorname =
      "Nominator Address: " +
      this.props.history.location.pathname.split("/")[3].toString().slice(0, 8) +
      "......" +
      this.props.history.location.pathname.split("/")[3].toString().slice(-8);
    
    let stashname =
      controllerId.toString().slice(0, 8) +
      "......" +
      controllerId.toString().slice(-8);
    
      let controllername = "controller: " + stashname;
    
    let bondvalue =
      "bonded: " + totalbonded.toString().slice(0, 5) + " DOT";

    
    let valtext =
      this.props.history.location.pathname.split("/")[3].toString().slice(0, 8) +
      "......" +
      this.props.history.location.pathname.split("/")[3].toString().slice(-8);

    let arr = valbacked;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // console.log("valstate",this.state.showValidatorAddress)
    return this.props.validatorandintentionloading ? (
      <React.Fragment>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        {/* <div
          className="back-arrow"
          onClick={this.BackbtnhandleClick}
          onMouseOver={this.BackbtnhandleOnMouseOver}
          onMouseOut={this.BackbtnhandleOnMouseOut}
        >
          &#8592;
        </div> */}

        <div className="nav-path">
  <div className="nav-path-link" onClick={this.handlePolkavizClick}>Polkaviz</div>
  <div>/</div>
  <div className="nav-path-link" onClick={this.handleAlexanderClick}>Alexander</div>
  <div>/</div>
  <div className="nav-path-current">{nominatorname}</div>
  <CopyToClipboard text={this.props.match.params.nominatorAddress} onCopy={this.onCopy}>
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




        {/* <div className="home"
            onClick={this.homebtnhandleClick}
            onMouseOver={this.BackbtnhandleOnMouseOver}
            onMouseOut={this.BackbtnhandleOnMouseOut}>
              &#127963;
        </div> */}
        {/* <div className="valheading">
          <h2>{nominatorname}</h2>
          <CopyToClipboard text={this.props.match.params.nominatorAddress} onCopy={this.onCopy}>
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
        </div> */}
        <Stage width={width} height={height}>
          <Layer>
          {this.state.copied && (
              <Text text="copied" x={1000} y={45} fill="green" fontSize={18}/>
            )}
            <Validators
              allvals={arr}
              rect_x={width / 2}
              circ_x={width / 2 - 200}
              circ_y={height / 2}
              totalinfo={this.props.valtotalinfo}
              // valinfo={this.props.valinfo}
              history={this.props.history}
            />
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

            <Circle
              x={width / 2 - 200}
              y={height / 2}
              radius={7}
              fill="white"
              onMouseOver={this.handleOnMouseOver}
              onMouseOut={this.handleOnMouseOut}
            />

            {this.state.showValidatorAddress && (
              <Text
                text={valtext}
                x={width / 2 - 200}
                y={height / 2 - 18}
                fill="#FFFFFF"
              />
            )}
          </Layer>
        </Stage>
        <div className="nombottombar">
          <NomBottombar controllername={controllername} bondvalue={bondvalue} />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(NominatorApp);
