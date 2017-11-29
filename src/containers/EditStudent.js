import React from 'react'
import { connect } from 'react-redux'

class EditStudent extends React.Component{
  render(){
    return (
      <div>THis is edit dix</div>
    );
  }
}
function mapStateToProps(state) {

  return { 
    students: state.studentReducer.students 
  };
}

export default connect(mapStateToProps)(EditStudent);
