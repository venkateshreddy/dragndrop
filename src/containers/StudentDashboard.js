import React from 'react';
import { connect } from 'react-redux';
import Dashboard from'./Dashboard';


class StudentDashboard extends React.Component{
  render(){
    return (
      <Dashboard students={ this.props.students } />
    );
  }
}
function mapStateToProps(state) {
  return { 
    students: state.studentReducer.students
  };
}

export default connect(mapStateToProps)(StudentDashboard);
