import React from 'react';
import { connect } from 'react-redux';
import { deleteElement } from '../actions';

class ActionDiv extends React.Component{
	render(){
		return(
			<span>
				<span className="action_link">Edit</span>
                <span className="action_link" onClick={() => this.props.deleteElement(this.props.elementid)}>Delete</span>
			</span>
		);
	}
}
function mapDispatchToProps(dispatch) {
  return {
    deleteElement: (id) => dispatch(deleteElement(id)),
  };
}

export default connect(mapDispatchToProps)(ActionDiv);
 