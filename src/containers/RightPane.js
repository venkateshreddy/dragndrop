import React from 'react';
import { connect } from 'react-redux';
import Textbox from '../components/Textbox';
import Dropdown from '../components/Dropdown';
import BooleanElement from '../components/BooleanElement';
import Checkbox from '../components/Checkbox';
import File from '../components/File'
import { deleteElement, editElement, clearFormElements } from '../actions';

class RightPane extends React.Component{
  
  //this sorts the list of elements based on order
  sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  render(){
    let form_elements = this.sortByKey(this.props.formReducer.formelements, 'order')
    let action_buttons = <div className="element_div"></div>;
    if(form_elements.length > 0){
      action_buttons = <div className="element_div">
                          <input type='button' value='Save Form' onClick={() => this.props.saveForm(this.props.formReducer.formelements)} />
                          &nbsp;&nbsp;
                          <input type='button' value='Clear Form' onClick={() => this.props.clearForm()} />
                        </div>
    }
    return (
      <div className="right_pane">
        <span><h2>Add New Form</h2></span>
        {
          form_elements.map ((element, index) => {
            if(element.type === 'textbox'){
              return  <div className="element_div" key={index}>
                        <Textbox element={element} />
                        <span className="action_link" onClick={() => this.props.editElement(element.id)}>Edit</span>
                        <span className="action_link" onClick={() => this.props.deleteElement(element.id)}>Delete</span>
                      </div>
            }else if(element.type === 'dropdown'){
              return  <div className="element_div" key={index}>
                        <Dropdown element={element}/>
                        <span className="action_link" onClick={() => this.props.editElement(element.id)}>Edit</span>
                        <span className="action_link"  onClick={() => this.props.deleteElement(element.id)}>Delete</span>
                      </div>
            }
            else if(element.type === 'radio'){
              return  <div className="element_div" key={index}>
                        <BooleanElement element={element}/>
                        <span className="action_link" onClick={() => this.props.editElement(element.id)}>Edit</span>
                        <span className="action_link" onClick={() => this.props.deleteElement(element.id)}>Delete</span>
                      </div>
            }
            else if(element.type === 'checkbox'){
              return  <div className="element_div" key={index}>
                        <Checkbox element={element} />
                        <span className="action_link" onClick={() => this.props.editElement(element.id)}>Edit</span>
                        <span className="action_link" onClick={() => this.props.deleteElement(element.id)}>Delete</span> 
                      </div>
            }
            else if(element.type === 'file'){
              return  <div className="element_div" key={index}>
                        <File element={element} />
                        <span className="action_link" onClick={() => this.props.editElement(element.id)}>Edit</span>
                        <span className="action_link" onClick={() => this.props.deleteElement(element.id)}>Delete</span> 
                      </div>
            }
            else{
              return "";
            }
          })
        }
        {action_buttons}
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    deleteElement: (id) => dispatch(deleteElement(id)),
    editElement : (id) => dispatch(editElement(id)),
    saveForm : (students) => console.log("Save data ",students),
    clearForm : () => dispatch(clearFormElements())
  };
}
function mapStateToProps(state) {
  return { 
    formReducer: state.formReducer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPane);
