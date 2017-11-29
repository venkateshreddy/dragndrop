import React from 'react';

class File extends React.Component{
	render(){
		return(
			<span>
				<input type="file" disabled={this.props.disabled} name={this.props.element.name}   />
			</span>
		);
	}
}

export default File;