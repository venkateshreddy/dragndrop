import React from 'react';

class BooleanElement extends React.Component{
	render(){
		return(
			<span>
			{
				this.props.element.values.map(this.renderRadio)
			}
			</span>
		);
	}

	renderRadio(item, index){
	  return <span className="radio_span" key={index}><input type='radio' /><label>{item.label}</label></span>
	}
}

export default BooleanElement;