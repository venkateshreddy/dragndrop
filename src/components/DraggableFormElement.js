import React from 'react';
import { Draggable } from 'react-drag-and-drop';

class DraggableFormElement extends React.Component{
	render(){
		return(
			<Draggable type="element" data={this.props.Data}>
            	<li>
              		<div className="element_li">
                		{this.props.elementType}
              		</div>
            	</li>
         	</Draggable>
        );
	}
}
export default DraggableFormElement;