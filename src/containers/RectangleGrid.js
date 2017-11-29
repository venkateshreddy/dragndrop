import React from 'react';
import { connect } from 'react-redux';
import RGL from 'react-grid-layout';
import { Droppable } from 'react-drag-and-drop';
import { addInternalElement, saveContainerLayout } from '../actions';
import Textbox from '../components/Textbox';
import Dropdown from '../components/Dropdown';
import BooleanElement from '../components/BooleanElement';
import Checkbox from '../components/Checkbox';
import File from '../components/File'
import Label from '../components/Label'
class RectangleGrid extends React.Component{
	render(){
		const element = this.props.element;
		let inner_elements = [];
		this.props.formReducer.formelements.map((innerelement, index) => {
			if( innerelement.isInnerElement && element.innerElements.indexOf(innerelement.id) >=0 ){
				inner_elements.push(innerelement);
			}
		})
		var layout = [];
	    var yStart = 0;
	    inner_elements.map ((element, index) =>{
	      yStart++;
	      if(element.position === null){
	        layout.push({i: element.id.toString(), x: 0, y: (yStart*2)-1, w: element.width, h: element.height});
	      }else{
	        layout.push(element.position)
	      }
	      return layout.length;
	    });
	    console.log("Inner Layout "+element.id.toString(), layout);
		return(
			<Droppable types={this.props.types} onDrop={this.onInternalDrop.bind(this)}>
                <div className="rectangle_element" id={element.id.toString()} >
                  	<RGL onDragStart={(layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,placeholder: LayoutItem, e: MouseEvent, element: HTMLElemen) =>e.stopPropagation()} key={element.id.toString()} 
                    	containerPadding={[0,0]} 
                      		onLayoutChange={(layout) => this.props.saveLayout(layout, element.id)} 
                        		className="layout" layout={[]} verticalCompact={false} cols={300} rowHeight={25} width={300} useCSSTransforms={false}>
                		{
			                inner_elements.map ((element, index) => {
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
			                  else if(element.type === 'label'){
			                    return  <div key={element.id.toString()} onDoubleClick={() => this.props.editElement(element.id)}>
			                              <Label element={element} />
			                            </div>
			                  }
			                  else{
			                    return null;
			                  }
			                })
			             }
                	</RGL>
                </div>
            </Droppable>
		);
	}
	onInternalDrop(data, event){
    	event.stopPropagation();
    	this.props.addElement(data.element, event.target.id);
    }
}
function mapDispatchToProps(dispatch) {
  return {
    addElement: (type, container) => dispatch(addInternalElement(type, parseInt(container))), 
    saveLayout : (layout, container) => dispatch(saveContainerLayout(layout, container))
  };
}
function mapStateToProps(state) {
  return { 
    formReducer: state.formReducer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RectangleGrid);