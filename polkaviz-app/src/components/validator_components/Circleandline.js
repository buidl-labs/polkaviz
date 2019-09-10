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
        this.setState({showNominatorAddress: true})
      }
      handleOnMouseOut = () => {
        this.setState({showNominatorAddress: false})
      }
      handleClick = () => {
        this.props.history.push("/nom/"+ this.props.text);
      }
    
    render(){
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
        <Line points={[this.props.x,this.props.y,this.props.x2,this.props.y2]} stroke="white" opacity={0.2}/>
        
        {this.state.showNominatorAddress && <Text text={this.props.text} x={this.props.x+10} y={this.props.y-20} fill="#FFFFFF" />}

        </React.Fragment>
    )
}
}
export default Circleandline