import React from 'react';

class Dropdown extends React.Component{
	render(){
		return(
			<span>
				<select name={this.props.element.name}>
		          <option value="">Select</option>
		          {this.props.element.options.map(this.renderOption)}
		        </select>
		    </span>
		);
	}
	
	renderOption(item, index){
      return <option key={index} value={item.innervalue}>{item.label}</option>
  	}  
}

export default Dropdown;