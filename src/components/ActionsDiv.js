import React from 'react';
import { connect } from 'react-redux';
import { deleteElement, editElement } from '../actions';
import EditIcon from '../images/edit.png';
import DeleteIcon from '../images/delete.png';

class ActionsDiv extends React.Component{
	render(){
		return(
          <span></span>
          /*<div className="actions_div">
            <img src={EditIcon} className="action_icon" alt="edit" onClick={() => this.props.editElement(this.props.elementid)} />
            <img src={DeleteIcon} className="action_icon" alt="delete" onClick={() => this.props.deleteElement(this.props.elementid)} />
          </div>*/
    );
	}
}
function mapStateToProps(state) {
  return { 
    formReducer: state.formReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    deleteElement: (id) => dispatch(deleteElement(id)),
    editElement : (id) => dispatch(editElement(id))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ActionsDiv);