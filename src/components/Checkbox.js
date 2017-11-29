import React from 'react';

class Checkbox extends React.Component{
	render(){
		return(
			<span>
				<input type='checkbox' name={this.props.element.name} />
            </span>
		);
	}
}

export default Checkbox;
 