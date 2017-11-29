import axios from 'axios';

let nextTodoId = 0
export function setCurrentForm(datasource){
  return function (dispatch) {
      axios({
        method:'get',
        url:'http://localhost:5000/getTableData',
        params:{table:datasource.name},
        responseType:'json'
      }).then(function(response) {
        dispatch({type:'SET_CURRENT_FORM',rows:response.data, datasource: datasource});  
      });
  };
}
export function getHtmlFormElements(){
  return function (dispatch) {
    axios({
      method:'get',
      url:'http://localhost:5000/htmlelements',
      responseType:'json'
    }).then(function(response) {
      //console.log("html elements ",response);
      dispatch({type:'LOAD_HTML_FORM_ELEMENTS', data:response.data});
    });
  };
}
export function getSavedApplications(){
  return function (dispatch) {
    axios({
      method:'get',
      url:'http://localhost:5000/applications',
      responseType:'json'
    }).then(function(response) {
      //console.log("applications ",response);
      dispatch({type:'LOAD_SAVED_APPLICATIONS', data:response.data});
    });
  };
}
export function deleteApplication(id){
  return function (dispatch) {
    axios({
      method:'post',
      url:'http://localhost:5000/deleteApplication',
      params:{appid:id},
      responseType:'json'
    }).then(function(response) {
      dispatch({type:'DELETE_APPLICATION', id:id});
    });
  };
}
export function getSavedDataSources() {
  return function (dispatch) {
    axios({
      method:'get',
      url:'http://localhost:5000/getAllTables',
      responseType:'json'
    }).then(function(response) {
      //console.log("Data loaded from database ",response);
      dispatch({type:'LOAD_DATA_SOURCES', data:response.data});
    });
  };
}
export function deleteRow(id, dataSource){
  console.log(dataSource);
  return function (dispatch) {
    axios({
      method:'get',
      url:'http://localhost:5000/deleteRow',
      params:{id:id, table:dataSource},
      responseType:'json'
    }).then(function(response) {
      dispatch({type:'DELETE_GRID_ROW', id:id});
    });
  };
}
export function saveApplication(name, dataSource, elements){
  return function (dispatch) {
    axios({
      method:'post',
      url:'http://localhost:5000/saveApplication',
      params:{name:name, table:dataSource, elements:elements},
      responseType:'json'
    }).then(function(response) {

        if(response.data.id !== undefined){
          dispatch({type:'SAVE_APPLICATION',obj:{id:response.data.id, name:name, datasource:dataSource, elements:elements,status:1}});  
          dispatch({type:"RESET_FORM"})
        }else{
          console.log("error in saving application ",response)
        }
        
    });
  };
}
export function updateApplication(name, id, elements){
  return function (dispatch) {
    axios({
      method:'post',
      url:'http://localhost:5000/updateApplication',
      params:{name:name, appid:id, elements:elements},
      responseType:'json'
    }).then(function(response) {
          dispatch({type:'UPDATE_APPLICATION', id:id, name:name, elements:elements});  
          dispatch({type:"RESET_FORM"});
    });
  };
}
export function loadCurrentApplication(application, datasource){
  return function (dispatch) {
    axios({
      method:'get',
      url:'http://localhost:5000/getTableData',
      params:{table:datasource.name},
      responseType:'json'
    }).then(function(response) {
        dispatch({type:'EDIT_APPLICATION',rows:response.data,application:application, datasource:datasource});
    });
  };
}
export const cancelCurrentPreview = () => ({
  type: 'CANCEL_PREVIEW'
});
export const cancelSave = () => ({
  type: 'CANCEL_SAVE'
});
export const previewCurrentForm = () =>({
  type: 'PREVIEW_UNSAVED_FORM'
});
export const saveFormLayout = (layout) => ({
  type: 'SAVE_FORM_LAYOUT',
  layout:layout
});
export const saveContainerLayout = (layout, containerid) => ({
  type: 'SAVE_FORM_LAYOUT',
  layout:layout,
  container:containerid
});
export const saveForm = () => ({
  type: 'PROMPT_FORM_NAME'
});
export const changeElementType = (id, type) => ({
  type: 'CHANGE_ELEMENT_TYPE',
  id: id,
  element_type: type
});
export const deleteElement = (id) => ({
	type:'REMOVE_ELEMENT',
	id:id
});

export const addElement = (type) => ({
  type:'ADD_ELEMENT',
  element_type:type,
  container:null
});
export const addInternalElement = (type, containerid) => ({
  type:'ADD_ELEMENT',
  element_type:type,
  container:containerid
})
export const editRow = (id) => ({
  type:'EDIT_GRID_ROW',
  id:id
});

export const editElement = (id) => ({
  type: 'SET_EDIT_ELEMENT',
  id: id
});
 
export const addRadioOption = () => ({
  type: 'ADD_RADIO_OPTION'
})

export const clearFormElements = () => ({
  type: 'RESET_FORM'
})

export const updateElement = (id, obj) => ({
  type: 'UPDATE_ELEMENT',
  id:id,
  obj: obj
});

export const addDropdownOption = () => ({
  type: 'ADD_DROPDOWN_OPTION'
})

export const deleteDropdownOption = (index) => ({
  type:'DELETE_DROPDOWN_OPTION',
  index: index
});

export const deleteRadioOption = (index) => ({
  type: 'DELETE_RADIO_OPTION',
  index: index
})

export const cancelEdit = () => ({
  type: 'CANCEL_EDIT'
})
export const deleteStudent = (studentid) => ({
	type: 'DELETE_STUDENT',
	id: studentid
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})
