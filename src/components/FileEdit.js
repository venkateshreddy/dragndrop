import React from 'react';
import { connect } from 'react-redux';
import { cancelEdit, updateElement } from '../actions'

class FileEdit extends React.Component{
	render(){
		var element = this.props.element;
		return(
			<div className="edit_div">
	            <span><h2>Editing textbox {element.display_text}</h2></span>
	        	<form>
	        		<input type="hidden" id="elementid" defaultValue={element.id} />
	        		<div className="element_div">Internal Name: <input type="text" name="name" id="name" defaultValue={element.name} placeholder="Name with no spaces" /></div>
	        		<div className="element_div">
	        			<input type="button" value="update" onClick={() => this.someFunction()} />
	        		</div>
	        	</form>
	        </div>
		);
	}
	someFunction(){
		var elementid = Number(document.getElementById("elementid").value);
		var internal_name = document.getElementById("name");
		if(internal_name.value === ""){
			alert("please enter internal name");
			internal_name.focus();
			return false;
		}
		var obj = {name:internal_name.value}
		this.props.updateElement(elementid, obj);
	}
}
function mapDispatchToProps(dispatch) {
  return {
    updateElement: (id, newobj) => dispatch(updateElement(id, newobj))
  };
}
function mapStateToProps(state) {
  return { 
    formReducer: state.formReducer
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FileEdit);
 