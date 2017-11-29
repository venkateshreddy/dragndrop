import React from 'react'
import { connect } from 'react-redux'
import { deleteStudent } from '../actions'


const Dashboard = ({ dispatch, students }) => {
  return (
    <div>
        <div><button>Add New Student</button></div>
        <table className="students_table">
          <thead>
          <tr><th>SNo</th><th>Name</th><th>Age</th><th>Qualification</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {
              students.map ((student, index) => {
                return <tr key={student.id}>
                  <td>{ index+1 }</td>
                  <td>{ student.name }</td>
                  <td>{ student.age }</td>
                  <td>{ student.qualification }</td>
                  <td><button name="edit">Edit</button><button name="delete" onClick={() => dispatch(deleteStudent(student.id))}>Delete</button></td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
  )

}

export default connect()(Dashboard)

