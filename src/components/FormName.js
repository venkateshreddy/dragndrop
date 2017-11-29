import React from 'react';
import { connect } from 'react-redux';
import { cancelSave, saveApplication, updateApplication } from '../actions';
import '../styles1.css';
import '../styles2.css';
import Modal from 'react-modal';

class FormName extends React.Component{
	constructor(props){
		super(props);
		let nameVal = "";
		if(props.formReducer.form_name !== null){
			nameVal = props.formReducer.form_name;
		}
		this.state = {
			value : nameVal
		}
	}
	render(){
		if(this.props.formReducer.save_form){
			let styles = {
	            overlay : {
	              position          : 'fixed',
	              top               : 1,
	              left              : 1,
	              right             : 1,
	              bottom            : 1,
	              backgroundColor   : 'rgba(255, 255, 255, 0.75)'
	            },
	            content : {
				    position                   : 'absolute',
				    top                        : '250px',
				    left                       : '500px',
				    right                      : '500px',
				    bottom                     : '300px',
				    border                     : '1px solid #ccc',
				    background                 : '#fff',
				    overflow                   : 'auto',
				    WebkitOverflowScrolling    : 'touch',
				    borderRadius               : '4px',
				    outline                    : 'none',
				    padding                    : '30px'
				  }
	          }
	        let form_name = "";
	        let save_btn = <input type='button' value="Save" onClick={() => this.saveApplication()} />;
	        if(this.props.formReducer.form_name !== null){
	        	form_name = this.props.formReducer.form_name;
	        	save_btn = <input type='button' value="Update" onClick={() => this.updateApplication()} />;
	        }
			return(
				<Modal style={styles} isOpen={true} contentLabel="Modal"> 
					<div className="element_div">
						<label className="label_div">Application Name</label>: <input onChange={()=>this.handleChange(this.value)} value={this.state.value} type='text' name="current_form_name" id="current_form_name" />
		            </div>
		            <div className="element_div">
						{save_btn}
						&nbsp;&nbsp;
						<input type='button' value="Cancel" onClick={() => this.props.dispatch(cancelSave())} />
		            </div>
	            </Modal>
			);
		}else{
			return <span></span>
		}
	}
	handleChange(value){
		this.setState({value:value});
	}
	componentWillReceiveProps(nextProps){
		this.setState({value:nextProps.formReducer.form_name})
	}
	saveApplication(){
		let appName = document.getElementById("current_form_name");
		if(appName.value === ""){
			alert("please enter application name");
			appName.focus();
			return false;
		}
		this.props.dispatch(saveApplication(appName.value, this.props.formReducer.datasource.name, this.props.formReducer.formelements));
	}
	updateApplication(){
		let appName = document.getElementById("current_form_name");
		if(appName.value === ""){
			alert("please enter application name");
			appName.focus();
			return false;
		}
		this.props.dispatch(updateApplication(appName.value, this.props.formReducer.form_id, this.props.formReducer.formelements));
	}
}
function mapStateToProps(state){
	return {
		formReducer: state.formReducer
	}
}

export default connect(mapStateToProps)(FormName);
 