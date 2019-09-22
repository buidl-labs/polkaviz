import React from 'react'
import {Circle, Line, Text} from 'react-konva'

class Circleandline extends React.Component{
    constructor(){
        super()
        this.state = {
            showNominatorAddress : false
        }
    }
    handleOnMouseOver = () => {
      document.body.style.cursor = "pointer";
        this.setState({showNominatorAddress: true})
      }
      handleOnMouseOut = () => {
        document.body.style.cursor = "default";
        this.setState({showNominatorAddress: false})
      }
      handleClick = () => {
        document.body.style.cursor = "default";
        this.props.history.push({
          pathname:"/nom/"+ this.props.text,
          state:{totalinfo:this.props.totalinfo,
            valinfo:this.props.valinfo
          }
    })
      }
    
    render(){
      console.log(this.props.totalinfo)
      let nomaddress = this.props.text.toString().slice(0,8) + "......" + this.props.text.toString().slice(-8)
    return(
        <React.Fragment>
        <Circle 
        x={this.props.x} 
        y={this.props.y} 
        radius={7} 
        fill="white"
        onMouseOver={this.handleOnMouseOver}
        onMouseOut={this.handleOnMouseOut}
        onClick={this.handleClick}
        />
        <Line points={[this.props.x,this.props.y,this.props.x2,this.props.y2]} stroke="white" opacity={0.3}/>
        
        {this.state.showNominatorAddress && <Text text={nomaddress} x={this.props.x+10} y={this.props.y-20} fill="#FFFFFF" />}

        </React.Fragment>
    )
}
}
export default Circleandline