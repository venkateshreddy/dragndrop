import React from 'react';

class Label extends React.Component{
	render(){
		return(
			<span>
				<div className="label_div"><label>{this.props.element.display_text}</label>: </div>
			</span>
		);
	}
}

export default Label;