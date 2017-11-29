import React from 'react';
import { connect } from 'react-redux';
import { cancelEdit, updateElement, deleteRadioOption, addRadioOption } from '../actions'

class RadioEdit extends React.Component{
	render(){
		var element = this.props.element;
		return(
			<div className="edit_div">
	            <span><h2>Editing Radiobutton {element.name}</h2></span>
	        	<form>
	        		<input type="hidden" id="elementid" defaultValue={element.id} />
	        		<div className="element_div">Internal Name: <input type="text" name="name" id="name" defaultValue={element.name} placeholder="Name with no spaces" /></div>
	        		<div className="element_div">
	        			<div><span>Options:</span></div>
	        			<div id="options_div" className="element_div">
	        				{
	        					this.props.element.values.map((option, index) =>{
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
	deleteOption(index){
		this.props.deleteOption(index)
	}
	renderOption(item, index){
		var labelid = "label"+(index+1)	
		return 	<div key={index}>
      				<span>{index+1}.</span>
      				<input title="Label" type="text" id={labelid} defaultValue={item.label} placeholder="Label" />
      				<span className="action_link" onClick={() => this.deleteOption(index)}>Delete</span>
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
		for(var i=1; i<=this.props.formReducer.edit_element.values.length; i++){
			var current_option_label = document.getElementById("label"+i)
			if(current_option_label.value === ""){
				alert("please enter label text for option");
				current_option_label.focus();
				return false;
			}else{
				temp_options.push({label:current_option_label.value});	
			}
		}
		var obj = {name:internal_name.value, values:temp_options}
		this.props.updateElement(elementid, obj);
	}
}
function mapDispatchToProps(dispatch) {
  return {
    updateElement: (id, newobj) => dispatch(updateElement(id, newobj)),
    deleteOption: (index) => dispatch(deleteRadioOption(index)),
    addOption: () => dispatch(addRadioOption())
  };
}
function mapStateToProps(state) {
  return { 
    formReducer: state.formReducer
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RadioEdit);