import React from 'react';
import { connect } from 'react-redux';
import { updateElement } from '../actions'

class CheckboxEdit extends React.Component{
	render(){
		var element = this.props.element;
		return(
			<div className="edit_div">
	            <span>Editing checkbox {element.name}</span>
	        	<form>
	        		<input type="hidden" id="elementid" defaultValue={element.id} />
	        		<div>Internal Name: <input type="text" name="name" id="name" defaultValue={element.name} placeholder="Name with no spaces" /></div>
	        		<div>
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
export default connect(mapStateToProps, mapDispatchToProps)(CheckboxEdit);