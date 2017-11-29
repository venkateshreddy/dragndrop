import React from 'react';
import { connect } from 'react-redux';
import { updateElement } from '../actions'

class LabelEdit extends React.Component{
	render(){
		var element = this.props.element;
		return(
			<div className="edit_div">
	            <span><h2>Editing Label {element.display_text}</h2></span>
	        	<form>
	        		<input type="hidden" id="elementid" defaultValue={element.id} />
	        		<div className="element_div">Display Text: <input type="text" name="display_text" id="display_text" defaultValue={element.display_text} /></div>
	        		<div className="element_div">
	        			<input type="button" value="update" onClick={() => this.someFunction()} />
	        		</div>
	        	</form>
	        </div>
		);
	}
	someFunction(){
		var elementid = Number(document.getElementById("elementid").value);
		var display_text = document.getElementById("display_text");
		if(display_text.value === ""){
			alert("please enter display text");
			display_text.focus();
			return false;
		}
		var obj = {display_text:display_text.value}
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
export default connect(mapStateToProps, mapDispatchToProps)(LabelEdit);
 