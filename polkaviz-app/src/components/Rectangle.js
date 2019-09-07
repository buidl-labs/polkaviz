import React from "react";
import { Rect, Text} from "react-konva";

class Rectangle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showValidatorAddress: false,
                    redirectpath: false };
  }
  
  componentDidMount() {
  }
  handleOnMouseOver = () => {
    this.setState({showValidatorAddress: true})
  }
  handleOnMouseOut = () => {
    this.setState({showValidatorAddress: false})
  }
  handleClick = () => {
    this.setState({redirectpath: true})
    //  this.props.history.push("/id")
    console.log("Clicked ",this.props.validatorAddress);
  }

  render() {
    return (
        //  <BrowserRouter>
        // <Link to="/id"> 
      <React.Fragment>
      <Rect
        x={this.props.x}
        y={this.props.y}
        width={6}
        height={12}
        fill={"#9335A3"}
        cornerRadius={4.69457}
        rotation={this.props.angle}
        onMouseOver={this.handleOnMouseOver}
        onMouseOut={this.handleOnMouseOut}
        onClick={this.handleClick}
      />
      
      {this.state.showValidatorAddress && <Text text={this.props.validatorAddress} x={this.props.x+20*Math.sin(this.props.angle *  0.0174533)} y={this.props.y-20*Math.cos(this.props.angle *  0.0174533)} fill="#FFFFFF" />}
      
        {// <BrowserRouter>
        //{this.state.redirectpath && <Redirect to = {`/id`} />}
        //</BrowserRouter> */}
      }

     </React.Fragment> 
      
      //    </Link> 
      // </BrowserRouter> 

      // </div>
    );
  }
}

export default Rectangle;
