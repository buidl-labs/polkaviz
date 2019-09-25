import React from "react";
// import ReactDOM from 'react-dom';
import { Rect, Text} from "react-konva";
// import {BrowserRouter as Route,Link} from 'react-router-dom'

class Rectangle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showValidatorAddress: false };
  }
  
  componentDidMount() {
  }

  handleOnMouseOver = (e) => {
    e.target.setAttrs({
      scaleX: 1.4,
      scaleY: 1.4
    });
    document.body.style.cursor = "pointer";
    this.setState({showValidatorAddress: true})
  }
  handleOnMouseOut = (e) => {
    e.target.setAttrs({
      scaleX: 1,
      scaleY: 1
    });
    document.body.style.cursor = "default";
    this.setState({showValidatorAddress: false})
  }
  handleClick = () => {
    document.body.style.cursor = "default";
    this.props.history.push({
      pathname:"/validator/"+ this.props.validatorAddress,
      state:{totalinfo:this.props.totalinfo,
      valinfo:this.props.valinfo,
      // nominatorinfo:this.props.nominatorinfo
    }
}
  )}

  render() {
    let valtext = "accountId: " + this.props.validatorAddress.toString().slice(0,8) + "......" + this.props.validatorAddress.toString().slice(-8)
    // console.log(this.props.angle)
    let x1 = this.props.x
    let y1 = this.props.y
    if(this.props.angle<=45 && this.props.angle>=0){
      x1 = this.props.x + 50
      y1 = this.props.y - 80
    }
    if(this.props.angle<0 && this.props.angle>-45){
      x1 = this.props.x -50
      y1 = this.props.y -140
    }
    if(this.props.angle<=-45 && this.props.angle>-135){
      x1 = this.props.x -285
      y1 = this.props.y
    }
    if(this.props.angle<=135 && this.props.angle>45){
      x1 = this.props.x +50
      y1 = this.props.y
    }
    if(this.props.angle<=-135 && this.props.angle>-180){
      x1 = this.props.x -50
      y1 = this.props.y +50
    }
    if(this.props.angle<=180 && this.props.angle>135){
      x1 = this.props.x + 50
      y1 = this.props.y 
    }
    // let linkaddress = "/val/" + this.props.validatorAddress
    return (
      <React.Fragment>
      {/* <Link to={linkaddress}> */}
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
      {/* </Link> */}
      {this.state.showValidatorAddress && 
      <Rect
        x={x1+20*Math.sin(this.props.angle *  0.0174533)-10}
        y={y1-20*Math.cos(this.props.angle *  0.0174533)-10}
        width={260}
        height={110}
        cornerRadius={4.69457}
        fill="#333333"
        shadowOffsetY={10}
        shadowBlur={10}
        shadowColor="black"
        shadowOpacity={0.5} />
      }
      {this.state.showValidatorAddress && 
      <Text text={valtext} 
        x={x1+20*Math.sin(this.props.angle *  0.0174533)} 
        y={y1-20*Math.cos(this.props.angle *  0.0174533) + 10}
        fontFamily="Roboto Mono" 
        fill="#FFFFFF" />   }
          {this.state.showValidatorAddress && 
          <Text text={this.props.nominators} 
          x={x1+20*Math.sin(this.props.angle *  0.0174533)} 
          y={y1-20*Math.cos(this.props.angle *  0.0174533)+30 } 
          fill="#FFFFFF" />}
          {this.state.showValidatorAddress && 
          <Text text={this.props.bondvalue} 
            x={x1+20*Math.sin(this.props.angle *  0.0174533)} 
            y={y1-20*Math.cos(this.props.angle *  0.0174533)+50} 
            fill="#FFFFFF" /> }
          {this.state.showValidatorAddress && 
          <Text text="Click to show Validator Analytics" 
            x={x1+20*Math.sin(this.props.angle *  0.0174533)} 
            y={y1-20*Math.cos(this.props.angle *  0.0174533)+80} 
            fill="#9099B6" /> }
     </React.Fragment> 
    );
  }
}

export default Rectangle;
