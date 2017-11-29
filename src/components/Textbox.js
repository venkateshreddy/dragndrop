import React from 'react';
import { connect } from 'react-redux';

class Textbox extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			value : props.element.value
		}
	}
	render(){
		return(
			<span>
				<input 
					onChange = {() => this.handleChange(this.value)}
					value = {this.state.value}
	               	type = "text" 
					id = {this.props.element.placeholder} 
					placeholder = {this.props.element.placeholder} 
					name = {this.props.element.name}   
				/>
			</span>
		);
	}
	componentWillReceiveProps(nextProps){
		this.setState({value:nextProps.element.value})
	}
	handleChange(value){
		this.setState({value:value})	
	}
}
export default Textbox;