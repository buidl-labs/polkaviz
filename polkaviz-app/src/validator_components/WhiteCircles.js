import React from 'react'
import Circleandline from './Circleandline.js'

function WhiteCircles(props){
        let angle= 0;
        var arr =[];

        if(props.n>5){
            angle += Math.PI/4
            for(var j=0;j<props.n;j++)
            {
                angle += 3/4*(2*Math.PI/(Number(props.n)+1))
                arr.push(<Circleandline x={props.r*Math.cos(angle)+props.x} 
                             y={props.r*Math.sin(angle)+props.y}
                             x2={props.x}
                             y2={props.y}
                             />
                )
                 
                
            }

        }

        else if (props.n%2===0){
            // rotated co-ordinate system by 90 degrees in anticlockwise
            angle+=Math.PI/2
            for(var i=0;i<props.n;i++)
            {
                let segments = Number(props.n)+1;
                angle += Math.PI/segments
                console.log(angle,segments)
                console.log(Math.PI/3)
                arr.push(
                    <Circleandline
                        x={props.x+props.r*Math.cos(angle)} 
                        y={props.y-props.r*Math.sin(angle)} 
                        x2={props.x}
                        y2={props.y} />)
                        console.log(props.x+props.r*Math.cos(angle),props.y-props.r*Math.sin(angle),props.x,props.y)
            }
        }
        
        else{
            for(i=0;i<props.n; i+=2)
            {
                angle= Math.PI-((i/2)*(Math.PI)/4);
                console.log(angle)
                    arr.push(
                        <Circleandline 
                            x={props.r*Math.cos(angle)+props.x} 
                            y={props.r*Math.sin(angle)+props.y} 
                            x2={props.x}
                            y2={props.y}
                            />)
                    arr.push(
                        <Circleandline
                            x={props.r*Math.cos(angle)+props.x} 
                            y={props.y - (props.r*Math.sin(angle))} 
                            x2={props.x}
                            y2={props.y}
                            />)
                }
            }
        
            return(
                arr
            )
}


export default WhiteCircles