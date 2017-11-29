import React from 'react';
import { connect } from 'react-redux';
import LeftPane from '../containers/LeftPane';
import RightGridPane from '../containers/RightGridPane';
import EditPane from '../containers/EditPane';
import PreviewPane from '../containers/PreviewPane' 
import FormName from '../components/FormName';
class FormBuilder extends React.Component{
  render(){
    return (
      <div>
      	<LeftPane />
      	<RightGridPane />
      	<EditPane />
      	<PreviewPane />
        <FormName />
      </div>
    );
   }
}
export default connect()(FormBuilder);
