import React from 'react'
import {Circle, Line} from 'react-konva'

function Circleandline(props){
    return(
        <React.Fragment>
        <Circle x={props.x} y={props.y} radius={10} fill="white"/>
        <Line points={[props.x,props.y,props.x2,props.y2]} stroke="white" opacity={0.2}/>
        </React.Fragment>
    )
}

export default Circleandline