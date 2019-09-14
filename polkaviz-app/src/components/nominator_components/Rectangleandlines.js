import React from 'react'
import {Line, Rect} from 'react-konva'

class Rectangleandlines extends React.Component{
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
            />
            </React.Fragment>
        )
    }
}

export default Rectangleandlines