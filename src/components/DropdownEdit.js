import React from 'react';
import { connect } from 'react-redux';
import { updateElement, deleteDropdownOption, addDropdownOption } from '../actions'

class DropdownEdit extends React.Component{
	render(){
		var element = this.props.element;
		console.log("Now edit element is ",element);
		return(
			<div className="edit_div">
	            <span><h2>Editing checkbox {element.name}</h2></span>
	        	<form>
	        		<input type="hidden" id="elementid" defaultValue={element.id} />
	        		<div className="element_div">Internal Name: <input type="text" name="name" id="name" defaultValue={element.name} placeholder="Name with no spaces" /></div>
	        		<div className="element_div">
	        			<div><span>Options:</span></div>
	        			<div id="options_div" className="element_div">
	        				{
	        					this.props.element.options.map((option, index) =>{
	        						return this.renderOption(option, index)
	        					})
	        				}
	        			</div> 
	        			<div className="element_div"><input type="button" value="Add Option" onClick={() => this.props.addOption()} /></div>
	        		</div>
	        		<div className="element_div">
	        			<input type="button" value="update" onClick={() => this.someFunction()} />
	        		</div>
	        	</form>
	        </div>
		);
	}
	renderOption(item, index){
		var labelid = "label"+(index+1)	
		var innerid = "inner"+(index+1)
      	return 	<div key={index}>
      				<span>{index+1}.</span>
      				<input title="Label" type="text" id={labelid} defaultValue={item.label} placeholder="Label" />
      				<input type="text" id={innerid} defaultValue={item.innervalue} title="Inner Value" placeholder="Inner value" />
      				<span className="action_link" onClick={() => this.props.deleteOption(index)}>Delete</span>
      			</div>
  	} 
	
	someFunction(){
		var elementid = Number(document.getElementById("elementid").value);
		var internal_name = document.getElementById("name");
		if(internal_name.value === ""){
			alert("please enter internal name");
			internal_name.focus();
			return false;
		}
		var temp_options = [];
		for(var i=1; i<=this.props.formReducer.edit_element.options.length; i++){
			var current_option_label = document.getElementById("label"+i)
			var current_option_innervalue = document.getElementById("inner"+i)
			if(current_option_label.value === ""){
				alert("please enter label text for option");
				current_option_label.focus();
				return false;
			}else if(current_option_innervalue.value === ""){
				alert("please enter inner value for option");
				current_option_innervalue.focus();
				return false;
			}else{
				temp_options.push({label:current_option_label.value, innervalue:current_option_innervalue.value});	
			}
		}
		var obj = {name:internal_name.value, options:temp_options}
		this.props.updateElement(elementid, obj);
	}
}
function mapDispatchToProps(dispatch) {
  return {
    updateElement: (id, newobj) => dispatch(updateElement(id, newobj)),
    deleteOption: (index) => dispatch(deleteDropdownOption(index)),
    addOption: () => dispatch(addDropdownOption())
  };
}
function mapStateToProps(state) {
  return { 
    formReducer: state.formReducer
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DropdownEdit);