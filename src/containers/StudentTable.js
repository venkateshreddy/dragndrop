import { connect } from 'react-redux'
import { deleteStudent } from '../actions'
import Dashboard from'./Dashboard';

const StudentTable = (students) => {
  return [
        {id:1, name:"Venkatesh", age:30, qualification:"MCA"},
        {id:2, name:"Venky", age:31, qualification:"MBA"},
        {id:3, name:"Venkat", age:32, qualification:"BSc"},
        {id:4, name:"KVR", age:33, qualification:"BCA"},
        {id:5, name:"KVREDDY", age:34, qualification:"Btech"}
      ]
}

const mapStateToProps = (state) => ({
  students: StudentTable(state.students)
})

const mapDispatchToProps = {
  onDelete: deleteStudent
}

const StudentDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default StudentDashboard