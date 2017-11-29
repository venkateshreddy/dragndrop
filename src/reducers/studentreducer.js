const initialState = {
  students: [
        {id:1, name:"Venkatesh", age:30, qualification:"MCA"},
        {id:2, name:"Venky", age:31, qualification:"MBA"},
        {id:3, name:"Venkat", age:32, qualification:"BSc"},
        {id:4, name:"KVR", age:33, qualification:"BCA"},
        {id:5, name:"KVREDDY", age:34, qualification:"Btech"}
      ]
};

export default function studentReducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case 'DELETE_STUDENT': {
      var newStudentsList = [];
      for(var i=0; i<st.students.length; i++){
        var student = st.students[i];
        if(student.id === action.id){

        }else{
          newStudentsList.push(student);
        } 
      }
      st = { ...state, students: newStudentsList};
      break;
    }
    default: {
      return st;
    }
    
  }
  return st;
}
