import React from 'react';
import { connect } from 'react-redux';
import Textbox from '../components/Textbox';
import Dropdown from '../components/Dropdown';
import BooleanElement from '../components/BooleanElement';
import Checkbox from '../components/Checkbox';
import File from '../components/File'
import Grid from '../components/Grid'
import Label from '../components/Label'
import RectangleGrid from './RectangleGrid'
import ActionsDiv from '../components/ActionsDiv'
import { editElement, setCurrentForm, loadCurrentApplication } from '../actions';
import { addElement, clearFormElements, previewCurrentForm, saveFormLayout, saveForm } from '../actions';
import ReactGridLayout from 'react-grid-layout';
import { Droppable } from 'react-drag-and-drop';
import '../styles1.css';
import '../styles2.css';

class RightGridPane extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isInternalDrop:false
    }
  }
  render(){
    let form_elements = [];
    this.props.formReducer.formelements.map((element, index) => {
      if(!element.isInnerElement){
        form_elements.push(element);
      }
    })
    let action_buttons = <div className="element_div"></div>;
    if(this.props.formReducer.form_id !==null){
      action_buttons = <div key='actions' className="element_div">
                          <input type='button' value='Save Form' onClick={() => this.props.saveForm()} />
                          &nbsp;&nbsp;
                          <input type='button' value='Clear Form' onClick={() => this.props.clearForm()} />
                          &nbsp;&nbsp;
                          <input type='button' value='Preview' onClick={() => this.props.previewForm()} />
                        </div>
    }
    var maintypes = ['element','datasource','applications'];
    var typesInRectangle = ['element'];
    var layout = [];
    var yStart = 0;
    form_elements.map ((element, index) =>{
      yStart++;
      if(element.position === null){
        if(element.type === 'rectangle')
          layout.push({i: element.id.toString(), isDraggable:true, x: 0, y: (yStart*2)-1, w: element.width, h: element.height});
        else
          layout.push({i: element.id.toString(), x: 0, y: (yStart*2)-1, w: element.width, h: element.height});
      }else{
        layout.push(element.position)
      }
      return layout.length;
    });
    console.log("Main Layout ", layout);
    return (
        <Droppable types={maintypes} onDrop={this.onDrop.bind(this)}>
          <div className="right_pane">
            <ReactGridLayout 
              containerPadding={[0,0]} 
              onLayoutChange={(layout) => this.props.saveLayout(layout)} 
              className="layout" layout={layout} verticalCompact={false} cols={1260} rowHeight={25} width={1260} useCSSTransforms={false}>
              <span><h2>Add New Form</h2></span>
              {
                form_elements.map ((element, index) => {
                  if(element.type === 'textbox'){
                    return  <div key={element.id.toString()} onDoubleClick={() => this.props.editElement(element.id)}>
                              <Textbox element={element} />
                            </div>
                  }else if(element.type === 'dropdown'){
                    return  <div key={element.id.toString()} onDoubleClick={() => this.props.editElement(element.id)}>
                              <Dropdown element={element}/>
                            </div>
                  }
                  else if(element.type === 'radio'){
                    return  <div key={element.id.toString()} onDoubleClick={() => this.props.editElement(element.id)}>
                              <BooleanElement element={element}/>
                            </div>
                  }
                  else if(element.type === 'checkbox'){
                    return  <div key={element.id.toString()} onDoubleClick={() => this.props.editElement(element.id)}>
                              <Checkbox element={element} />
                            </div>
                  }
                  else if(element.type === 'file'){
                    return  <div key={element.id.toString()} onDoubleClick={() => this.props.editElement(element.id)}>
                              <File element={element} disabled="disabled" />
                            </div>
                  }
                  else if(element.type === 'grid'){
                    return  <div key={element.id.toString()} onDoubleClick={() => this.props.editElement(element.id)}>
                              <Grid element={element} />
                            </div>
                  }
                  else if(element.type === 'label'){
                    return  <div key={element.id.toString()} onDoubleClick={() => this.props.editElement(element.id)}>
                              <Label element={element} />
                            </div>
                  }
                  else if(element.type === 'rectangle'){
                    return  <div key={element.id.toString()}  onDoubleClick={() => this.props.editElement(element.id)}>
                              <RectangleGrid editelement={this.props.editElement} types={typesInRectangle} element={element} />
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
        </Droppable>
    )
  }
  loadDataSource(id){
    this.props.datasources.map((datasource,index) => {
      if(datasource.id === parseInt(id, 10)){
        this.props.loadForm(datasource);
      }
      return null;
    });
  }
  loadApplication(id){
    this.props.applications.map((application,index) => {
      if(application.id === parseInt(id, 10)){
        this.props.datasources.map((datasource, index) => {
          console.log(datasource.name +"-"+application.datasource);
          if(datasource.name === application.datasource){
            console.log("loading app");
            this.props.loadApplication(application, datasource);
          }
        })
      }
      return null;
    }); 
  }
  onDrop(data) {
    if(data.applications !== "" && !isNaN(data.applications)){
      this.loadApplication(data.applications);
    }else if(data.datasource !== "" && !isNaN(data.datasource)){
      this.loadDataSource(data.datasource);
    }else{  
      this.props.addElement(data.element);
    }
  }
}
function mapDispatchToProps(dispatch) {
  return {
    loadForm: (datasource) => dispatch(setCurrentForm(datasource)),
    addElement: (type) => dispatch(addElement(type)), 
    saveForm : () => dispatch(saveForm()),
    clearForm : () => dispatch(clearFormElements()),
    previewForm : () => dispatch(previewCurrentForm()),
    saveLayout : (layout) => dispatch(saveFormLayout(layout)),
    editElement : (id) => dispatch(editElement(id)),
    loadApplication:(application, datasource) => dispatch(loadCurrentApplication(application, datasource))
  };
}
function mapStateToProps(state) {
  return { 
    formReducer: state.formReducer,
    datasources:state.appReducer.datasources,
    applications:state.appReducer.applications
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RightGridPane);