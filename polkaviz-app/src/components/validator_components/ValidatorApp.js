import React from "react"
import { Stage, Layer, Arc, Line, Rect} from 'react-konva';
import Form from "./form"
import WhiteCircles from './WhiteCircles'

class ValidatorApp extends React.Component{
        constructor(){
            super()
            this.state = {
                noOfCircle: 5
            }
        }

        getNoOfCircles = (e) => {
            let totalcircles = e.target.value;
            totalcircles=totalcircles<0 ? 0 : totalcircles
            this.setState({
                noOfCircle: totalcircles
            })
            }

        render(){
        const width = window.innerWidth;
        const height = window.innerHeight;
        let radius = 100;
        if(this.state.noOfCircle>10)
        {
            radius = 200;
        }
        return(
            <div>
            <Form getNoOfCircles={this.getNoOfCircles} value={this.state.noOfCircle}/>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                
                {/* Here n is number of white circles to draw
                        r is radius of the imaginary circle on which we have to draw white circles
                        x,y is center of imaginary circle 
                     */}

                <WhiteCircles n={this.state.noOfCircle} r={radius} x={width/2+10} y={height/2+5} />            

                {/* Arc used to create the semicircle on the right, 
                    Rotation is used to rotate the arc drawn by 90 degrees in clockwise direction
                */}
                    <Arc 
                    x={width-2} 
                    y={height/2} 
                    innerRadius={height/2 -25} 
                    outerRadius={height/2-24} 
                    rotation={90}
                    angle={180}
                    stroke="white" />
                {/* Adding 6 to stating and ending y point and 24 to length of line
                    because the upper left corner of rectangle is at width/2,height/2
                    so mid point of rectangle becomes width/2+12,height/2+6
                 */}
                    <Line 
                    points={[width/2,height/2+6,width-height/2+24,height/2+6]}
                    fill="white"
                    stroke="white"
                    opacity={0.2}
                    />
                    
                    <Rect
                    x={width/2}
                    y={height/2}
                    width={24}
                    height={12}
                    fill="purple"
                    cornerRadius={10} 
                    />

                    
                
                </Layer> 
            </Stage>
            </div>
        )
    }
}

export default ValidatorApp
