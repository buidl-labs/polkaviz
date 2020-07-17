import React from "react";
import { Stage, Layer, Arc, Line, Rect, Text } from "react-konva";
import WhiteCircles from "./WhiteCircles";
import { withRouter } from "react-router-dom";

class CouncilApp extends React.Component {
  constructor() {
    super();
    this.container = React.createRef();
    this.state = {
      validator: "",
      nominators: [],
      showValidatorAddress: false,
      stash: "",
      stageWidth: undefined,
      stageHeight: undefined,
      controller: "",
      totalinfo: [],
      valinfo: {},
      CouncilData: undefined,
      copied: false,
    };
    this.ismounted = false;
    this.totalvalue = 0;
    this.ownvalue = 0;
  }

  componentDidMount() {
    this.serverApi();
    this.ismounted = true;
    this.checkSize();
    // here we should add listener for "container" resize
    // take a look here https://developers.google.com/web/updates/2016/10/resizeobserver
    // for simplicity I will just listen window resize
    window.addEventListener("resize", this.checkSize);
  }

  checkSize = () => {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;
    // console.log(width, height);
    this.setState({
      stageWidth: width,
      stageHeight: height
    });
  };

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
      state: { totalinfo: this.props.totalinfo, valinfo: this.props.valinfo },
    });
  };
  homebtnhandleClick = () => {
    document.body.style.cursor = "default";
    this.props.history.push({
      pathname: "/",
      state: { totalinfo: this.props.totalinfo, valinfo: this.props.valinfo },
    });
  };
  onCopy = () => {
    console.log("youp", this.ismounted);
    if (this.ismounted) {
      this.setState({ copied: true }, () => {
        console.log("copied state set");
        setInterval(() => {
          this.setState({ copied: false });
        }, 3000);
      });
    }
  };

  async serverApi() {
    const url =
      "https://yieldscan-api.onrender.com/api/council/member/" +
      this.props.match.params.id;
    try {
      const council_response = await fetch(url);
      const council_data = await council_response.json();
      console.log("validator_data");
      console.log(council_data);

      // // Handle validator data
      // if (validator_data && validator_data.length > 0) {
      //   arr1 = JSON.parse(JSON.stringify(validator_data)).map(({ currentValidator, accountIndex }) => {
      //     // console.log(info);
      //     return {
      //       valname: currentValidator.accountId,
      //       valinfo: currentValidator,
      //       accountIndex: accountIndex,

      //     };
      //   });
      //   // console.log('arr1++++++++++', arr1);
      // }

      // // Handle intention data
      // if (intention_data && intention_data.intentions.length > 0) {
      //   // console.log('+++++++++++______+++++++')
      //   // console.log(intention_data.intentions)
      //   const intentionsValname = intention_data.intentions
      //   const intentionsInfo = intention_data.info
      //   const arr2 = intentionsValname.map( currentIntention => {
      //     // console.log('currentIntention' + currentIntention);
      //     // console.log('currentIntention index' + JSON.stringify(intentionsValname.indexOf(currentIntention)));
      //     return {
      //       valname: currentIntention,
      //       valinfo: JSON.parse(JSON.stringify(intentionsInfo[intentionsValname.indexOf(currentIntention)])),
      //     };
      //   });
      //   // console.log('arr2++++++++++', arr2);

      //   // set state to render both intention and validators
      //   this.setState({
      //     ValidatorsData: arr1,
      //     IntentionsData: arr2,
      //   });
      // }
      this.setState({
        CouncilData: council_data,
      });
    } catch (err) {
      console.log("err", err);
    }
  }

  handlePolkavizClick = () => {
    document.body.style.cursor = "default";
    this.props.history.push({
      pathname: "/",
    });
  };

  handleAlexanderClick = () => {
    document.body.style.cursor = "default";
    this.props.history.push({
      pathname: "/alexander",
    });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkSize);
    this.ismounted = false;
  }
  render() {
    const width = this.state.stageWidth === undefined ? window.innerWidth: this.state.stageWidth;
    const height = this.state.stageHeight === undefined ? window.innerHeight : this.state.stageHeight;
    // console.log(width, height);
    let radius = 400;

    if (this.state.nominators.length > 10) {
      radius = 200;
    }
    let opacity = 0.3;
    
    return this.state.CouncilData === undefined ? (
      <React.Fragment>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </React.Fragment>
    ) : (
      <>
      <div className="specific-view">
        {/* <div
          className="back-arrow"
          onClick={this.BackbtnhandleClick}
          onMouseOver={this.BackbtnhandleOnMouseOver}
          onMouseOut={this.BackbtnhandleOnMouseOut}
        >
          &#8592;
        </div> */}

        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {this.state.copied && (
              <Text text="copied" x={1000} y={45} fill="green" fontSize={18} />
            )}
            {/* Here n is number of white circles to draw
                        r is radius of the imaginary circle on which we have to draw white circles
                        x,y is center of imaginary circle 
                     */}

            <WhiteCircles
              r={radius}
              x={width / 2 + 13}
              y={height / 2 + 6}
              maxRadius={height / 2 - 15}
              history={this.props.history}
              councilinfo={this.state.CouncilData}
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
                height / 2 + 6,
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
              fill={'#48607C'}
              cornerRadius={10}
              // onMouseOver={this.handleOnMouseOver}
              // onMouseOut={this.handleOnMouseOut}
            />
          </Layer>
        </Stage>
      </div>
    </>
    );
  }
}

export default withRouter(CouncilApp);
