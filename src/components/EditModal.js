import React from 'react';
import Modal from 'react-modal';

class EditModal extends React.Component{
	render(){
		return(
			<Modal isOpen={true} closeTimeoutMS={10} contentLabel="Modal">
			  <h1>Modal Content</h1>
			  <p>Etc.</p>
			</Modal>
		)
	}
}
export default EditModal
