import React from 'react';
import { connect } from 'react-redux';
import Textbox from '../components/Textbox';
import Dropdown from '../components/Dropdown';
import BooleanElement from '../components/BooleanElement';
import Checkbox from '../components/Checkbox';
import File from '../components/File'
import Grid from '../components/Grid'
import Label from '../components/Label'
import ReactGridLayout from 'react-grid-layout';
import { cancelCurrentPreview, saveForm } from '../actions';
import '../styles1.css';
import '../styles2.css';
import Modal from 'react-modal';

class PreviewPane extends React.Component{
  render(){
    if(this.props.formReducer.preview_form !== null){
      let styles = {
            overlay : {
              position          : 'fixed',
              top               : 10,
              left              : 10,
              right             : 10,
              bottom            : 10,
              backgroundColor   : 'rgba(255, 255, 255, 0.75)'
            }
          }
      let form_elements = this.props.formReducer.preview_form.formelements
      let action_buttons = <div className="element_div"></div>;
      if(form_elements.length > 0){
        action_buttons = <div key='actions' className="element_div">
                            <input type='button' value='Save Form' onClick={() => this.props.saveForm()} />
                            <input type='button' value='Ok' onClick={() => this.props.cancelPreview()} />
                          </div>
      }
      var layout = [];
       var yStart = 0;
      form_elements.map ((element, index) =>{
         yStart++;
      if(element.position === null){
        layout.push({i: element.id.toString(), x: 0, y: (yStart*2)-1, w: element.width, h: element.height});
      }else{
        layout.push(element.position)
      }
      return layout.length;
    });
    return (
          <Modal style={styles} isOpen={true} contentLabel="Modal">  
            <div>
              <ReactGridLayout 
              containerPadding={[0,0]} 
              className="layout" isDraggable={false} isResizable={false}  layout={layout} verticalCompact={false} cols={1260} rowHeight={25} width={1260} useCSSTransforms={true}>
                <span><h2>Preview Form</h2></span>
                {
                  form_elements.map ((element, index) => {
                    if(element.type === 'textbox'){
                      return  <div key={element.id.toString()}>
                                <Textbox element={element} />
                              </div>
                    }else if(element.type === 'dropdown'){
                      return  <div key={element.id.toString()}>
                                <Dropdown element={element}/>
                              </div>
                    }
                    else if(element.type === 'radio'){
                      return  <div key={element.id.toString()}>
                                <BooleanElement element={element}/>
                              </div>
                    }
                    else if(element.type === 'checkbox'){
                      return  <div key={element.id.toString()}>
                                <Checkbox element={element} />
                              </div>
                    }
                    else if(element.type === 'file'){
                      return  <div key={element.id.toString()}>
                                <File disabled="" element={element} />
                              </div>
                    }
                    else if(element.type === 'grid'){
                      return  <div key={element.id.toString()}>
                                <Grid element={element} />
                              </div>
                    }
                    else if(element.type === 'label'){
                      return  <div key={element.id.toString()}>
                                <Label element={element} />
                              </div>
                    }
                    else{
                      return "";
                    }
                  })
                }
              </ReactGridLayout>
            {action_buttons}
            </div>
          </Modal>
      );
    }else{
      return(<span></span>);
    }
  }
}
function mapDispatchToProps(dispatch) {
  return {
    saveForm : () => dispatch(saveForm()),
    cancelPreview : () => dispatch(cancelCurrentPreview())
  };
}
function mapStateToProps(state) {
  return { 
    formReducer: state.formReducer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewPane);
