import React from 'react';
import { connect } from 'react-redux';
import TextboxEdit from '../components/TextboxEdit';
import DropdownEdit from '../components/DropdownEdit';
import RadioEdit from '../components/RadioEdit';
import CheckboxEdit from '../components/CheckboxEdit';
import FileEdit from '../components/FileEdit'
import LabelEdit from '../components/LabelEdit'
import Modal from 'react-modal';
import { cancelEdit, deleteElement, changeElementType } from '../actions'

class EditPane extends React.Component{
  render(){
      if(this.props.formReducer.edit_element !== null){
        let edit_element = this.props.formReducer.edit_element;
        let styles = {
              overlay : {
                position          : 'fixed',
                top               : 10,
                left              : 10,
                right             : 10,
                bottom            : 10,
                backgroundColor   : 'rgba(255, 255, 255, 0.75)'
              },
              content : {
                top                   : '30%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-40%, -40%)'
              }
            }
        
        let total_elements = this.props.formReducer.formelements.length
        let options = [];
        for (let i=1; i <= total_elements; i++) {
            options.push(<option key={i} value={i}>{i}</option>);
        }
        let actions_div = <div className="element_div">
                <input type="button" value="delete" onClick={() => this.deleteElement(edit_element.id)} />               
                &nbsp;&nbsp;
                <input type="button" value="Ok" onClick={() => this.props.cancelEdit()} />
              </div>
        let change_type_div =  <div className="element_div">
                <select id="new_element_type">
                  {
                    this.props.html_elements.map((element, index) =>{
                      return <option key={index} value={element.internal_value}>{element.element_name}</option>
                    })
                  }
                </select>               
                &nbsp;&nbsp;
                <input type="button" value="Change Type" onClick={() => this.changeElementType()} />
              </div>     
        if(edit_element.type === 'textbox'){
            return (
              <Modal style={styles} isOpen={true} contentLabel="Modal">
                {change_type_div}
                <TextboxEdit element={edit_element} />
                {actions_div}
              </Modal>
            );
          }else if(edit_element.type === 'dropdown'){
            return (
              <Modal style={styles} isOpen={true} contentLabel="Modal">
                {change_type_div}
                <DropdownEdit element={edit_element} />
                {actions_div}
              </Modal>
            );
          }else if(edit_element.type === 'radio'){
            return (
              <Modal style={styles} isOpen={true} contentLabel="Modal">
                {change_type_div}
                <RadioEdit element={edit_element} />
                {actions_div}
              </Modal>
            );
          }else if(edit_element.type === 'checkbox'){
            return (
              <Modal style={styles} isOpen={true} contentLabel="Modal">
                {change_type_div}
                <CheckboxEdit element={edit_element} />
                {actions_div}
              </Modal>
            );
          }else if(edit_element.type === 'file'){
            return (
              <Modal style={styles} isOpen={true} contentLabel="Modal">
                {change_type_div}
                <FileEdit element={edit_element} />
                {actions_div}
              </Modal>
            );
          }else if(edit_element.type === 'label'){
            return (
              <Modal style={styles} isOpen={true} contentLabel="Modal">
                {change_type_div}
                <LabelEdit element={edit_element} />
                {actions_div}
              </Modal>
            );
          }
          else{
            return(
              <span>unknown element type</span>
            );
          }
        }else{
          return(
            <span></span>
          );
        }
  }
  deleteElement(id){
    this.props.deleteElement(id)
    this.props.cancelEdit()
  }
  changeElementType(){
    let newType = document.getElementById("new_element_type").value;
    let elementid = Number(document.getElementById("elementid").value);
    this.props.changeElementType(elementid, newType);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteElement: (id) => dispatch(deleteElement(id)),
    cancelEdit: () => dispatch(cancelEdit()),
    changeElementType: (id, type) => dispatch(changeElementType(id, type))
  };
}
function mapStateToProps(state) {
  return { 
    formReducer: state.formReducer,
    html_elements:state.appReducer.html_elements
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditPane)