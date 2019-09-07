import React from 'react'
import Circleandline from './Circleandline.js'

class WhiteCircles extends React.Component{
    render(){
        let angle= 2/3*Math.PI;
        let maxAngle = 2/3*Math.PI
        var arr =[];

        // if(this.props.n>5){
        //     angle += Math.PI/4
        //     for(var j=0;j<this.props.n;j++)
        //     {
        //         angle += 3/4*(2*Math.PI/(Number(this.props.n)+1))
        //         arr.push(<Circleandline x={this.props.r*Math.cos(angle)+this.props.x} 
        //                      y={this.props.r*Math.sin(angle)+this.props.y}
        //                      x2={this.props.x}
        //                      y2={this.props.y}
        //                      />
        //         )
                 

                
        //     }

        // }

        // else if (this.props.n%2===0){
        //     // rotated co-ordinate system by 90 degrees in anticlockwise
        //     angle+=Math.PI/2
        //     for(var i=0;i<this.props.n;i++)
        //     {
        //         let segments = Number(this.props.n)+1;
        //         angle += Math.PI/segments
        //         arr.push(
        //             <Circleandline
        //                 x={this.props.x+this.props.r*Math.cos(angle)} 
        //                 y={this.props.y-this.props.r*Math.sin(angle)} 
        //                 x2={this.props.x}
        //                 y2={this.props.y} />)
        //     }
        // }
        
        // else{
        //     for(i=0;i<this.props.n; i+=2)
        //     {
        //         angle= Math.PI-((i/2)*(Math.PI)/4);
        //             arr.push(
        //                 <Circleandline 
        //                     x={this.props.r*Math.cos(angle)+this.props.x} 
        //                     y={this.props.r*Math.sin(angle)+this.props.y} 
        //                     x2={this.props.x}
        //                     y2={this.props.y}
        //                     />)
        //             arr.push(
        //                 <Circleandline
        //                     x={this.props.r*Math.cos(angle)+this.props.x} 
        //                     y={this.props.y - (this.props.r*Math.sin(angle))} 
        //                     x2={this.props.x}
        //                     y2={this.props.y}
        //                     />)
        //         }
        //     }

            if(this.props.n>5)
            {
                angle = Math.PI/4
                maxAngle = 3/4*2*Math.PI
            }

            this.props.nominators.forEach(element => {
                angle += maxAngle/(Number(this.props.n)+1)
                arr.push(
                    <Circleandline 
                            x={this.props.r*Math.cos(angle)+this.props.x} 
                            y={this.props.r*Math.sin(angle)+this.props.y} 
                            x2={this.props.x}
                            y2={this.props.y}
                            text={element.who}
                            />)
            });
        
            return(
                arr
            )
    }
}


export default WhiteCircles