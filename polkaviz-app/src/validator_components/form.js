import React from 'react'

class Form extends React.Component{
    render(){
        return(
            <input type="text" name="circles" onChange={this.props.getNoOfCircles} value={this.props.value} placeholder="Enter no of circles"/>
        )
    }
}

export default Form