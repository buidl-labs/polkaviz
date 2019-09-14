import React from 'react'
import {Line, Rect} from 'react-konva'

class Rectangleandlines extends React.Component{
    handleOnMouseOver = () => {
        this.setState({showValidatorAddress: true})
      }
      handleOnMouseOut = () => {
        this.setState({showValidatorAddress: false})
      }
      handleClick = () => {
        this.props.history.push({
          pathname:"/val/"+ this.props.validatorAddress,
          state:{totalinfo:this.props.totalinfo,
          valinfo:this.props.valinfo}
    }
      )}
    render(){
        return(
            <React.Fragment>
            <Line points={[this.props.circ_x, this.props.circ_y, this.props.x-12, this.props.y]}
            stroke="white"
            opacity={0.2}
            />
            <Line
                points={[this.props.x,this.props.y,this.props.xline,this.props.y]}
                stroke="white"
                opacity={0.2}
                />
            <Rect 
            x={this.props.x-12}
            y={this.props.y-6}
            width={24}
            height={12}
            fill="purple"
            cornerRadius={10}
            onMouseOver={this.handleOnMouseOver}
            onMouseOut={this.handleOnMouseOut}
            onClick={this.handleClick}
            />
            </React.Fragment>
        )
    }
}

export default Rectangleandlines