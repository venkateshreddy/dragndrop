import React from 'react';
import { connect } from 'react-redux';
import DraggableFormElement from '../components/DraggableFormElement';
import { Draggable } from 'react-drag-and-drop';
import TreeView from 'react-treeview';
import '../react-treeview.css';
import NewIcon from '../images/new.png'
import UploadIcon from '../images/upload.png'
import { getSavedDataSources, getHtmlFormElements, getSavedApplications, deleteApplication } from '../actions'

class LeftPane extends React.Component{
  renderFormStructure(form, index){
    const label = <span className="node sub_node">{form.name}</span>;

    return  <Draggable type="datasource" data={form.id} key={form.id}>
              <TreeView nodeLabel={label} key={index} defaultCollapsed={true}>
                <ul className="static_ul">
                { 
                  form.fields.map((element, index) =>{
                    return <Draggable key={index} type="element" data="TEXTBOX"><li><div className="element_li">{element.display_text}</div></li></Draggable>
                  })
                }
                </ul>
              </TreeView>
            </Draggable>
  }
  componentWillMount(){
    this.props.dispatch(getSavedDataSources())
    this.props.dispatch(getHtmlFormElements())
    this.props.dispatch(getSavedApplications())
  }
  render(){
    const form_elements_label = <span className="node main_node">Form Elements</span>;
    const forms_label = <span><span className="node main_node">Data Sources<span className="data_count">({this.props.datasources.length})</span></span><span className="action_link"><img src={NewIcon} className="action_icon" /></span></span>;
    const applications = <span className="node main_node">Applications<span className="data_count">({this.props.applications.length})</span></span>;
    return (
      <div className="side_div">
        <TreeView nodeLabel={applications} defaultCollapsed={true}>
          <ul className="static_ul">
          {
            this.props.applications.map((application, index) => {
                return <Draggable type="applications" data={application.id} key={application.id}>
                          <li>
                            <div className="element_li">
                              {application.name}
                              <div className="actions_div">
                                <span className="action_link">View</span>
                                <span className="action_link" onClick={() => this.props.dispatch(deleteApplication(application.id))}>Delete</span>
                              </div>
                            </div>
                          </li>
                        </Draggable>
            })
          }
          </ul>
        </TreeView>
        <TreeView nodeLabel={forms_label} defaultCollapsed={true}>
        {
          this.props.datasources.map((form, index) =>{
            return this.renderFormStructure(form, index)
          })
        }
        </TreeView>
        <TreeView nodeLabel={form_elements_label} defaultCollapsed={true}>
        <ul className="static_ul">
          {
            this.props.html_elements.map((element, index) =>{
              if(element.is_addable === 1)
                return <DraggableFormElement key={index} elementType={element.element_name} Data={element.internal_value} />
              else
                return null;
            })
          }
        </ul>
        </TreeView>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    datasources:state.appReducer.datasources,
    html_elements:state.appReducer.html_elements,
    applications:state.appReducer.applications
  }
}
export default connect(mapStateToProps)(LeftPane)