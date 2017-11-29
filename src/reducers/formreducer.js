
function getInitialState(){
  return {
    form_id:null,
    formelements: [],
    form_name:null,
    current_id:0,
    edit_element:null,
    datasource :null,
    current_layout:[],
    preview_form:null,
    fields:{},
    rows:[],
    save_form:false,
    edit_application:null
  };
}
function getElementObject(type){
  switch (type) {
    case "LABEL": {
      return {type:"label", display_text:"New Label", width:90, height:1.5};
    }
    case "TEXTBOX": {
      return {type:"textbox", value:"", name:"", width:200, height:1, placeholder:"", max_length:30, isInnerElement:false};
    }
    case "RADIO": {
      return {type:"radio", value:"", name:"", width:200, height:1.5, values:[{label:"Yes"}, {label:"No"}], isInnerElement:false};
    }
    case "DROPDOWN": {
      return {type:"dropdown", name:"", value:"", width:200, height:1.5, options:[{label:"Option1", innervalue:"1"}, {label:"Option2", innervalue:"2"}], isInnerElement:false};
    }
    case "CHECKBOX": {
      return {type:"checkbox", name:"", value:"", width:15, height:1.5, isInnerElement:false};
    }
    case "FILE": {
      return {type:"file", name:"", width:225, height:1.5, isInnerElement:false};
    }
    case "GRID": {
      return {type:"grid", width:60, height:500, isInnerElement:false}
    }
    case "RECTANGLE": {
      return {type:"rectangle", width:400, height:8, innerElements:[], isInnerElement:false}
    }
    default: {
      console.log("Trying to add the element which is not defined in reducer");
      return;
    }
  }
}
export default function formReducer(state = getInitialState(), action) {
  let st = state;
  console.log("Before "+action.type, st);
  switch (action.type) {
    case 'SET_CURRENT_FORM':{
      let newForm = getInitialState();
      newForm.form_id = action.datasource.id;
      newForm.datasource = action.datasource;
      newForm.rows = action.rows;
      let newColumns = {};
      action.datasource.fields.map((field, index) => {
        newColumns[field.display_text] = field.display_text;

        let newElement = getElementObject("TEXTBOX");
        if(newElement){
          newElement.id = index+1;
          newElement.position = null;
          newElement.placeholder = field.display_text;
          newElement.name = field.display_text;
          newForm.formelements.push(newElement)
        }
        return index;
      })
      newForm.current_id = action.datasource.fields.length + 2;
      let gridElement = getElementObject("GRID");
      gridElement.id = action.datasource.fields.length+1;
      gridElement.position = null;
      gridElement.height = (action.rows.length)*2
      gridElement.width = 500
      newColumns.Actions = "Actions";
      newForm.fields = newColumns;
      newForm.formelements.push(gridElement);
      st = newForm;
      console.log(action.datasource);
      break;
    }
    case 'SAVE_FORM_LAYOUT':{
      let newFormElements = st.formelements
      action.layout.forEach(function(position){
        if(!isNaN(position.i)){
          newFormElements.forEach(function(element){
            if(element.id === parseInt(position.i, 10)){
              element.position = position;
            }
          });
        }
      })
      st = {...state, formelements:newFormElements};
      break;
    }
    case 'PREVIEW_UNSAVED_FORM':{
      let preview_form = {formelements:st.formelements, layout:st.current_layout}
      st = {...state, preview_form:preview_form};
      break;
    }
    case 'CANCEL_PREVIEW':{
      st = {...state, preview_form:null};
      break;
    }
    case 'REMOVE_ELEMENT': {
      let newFormElements = [];
      for(let i=0; i<st.formelements.length; i++){
        let element = st.formelements[i];
        if(element.id === action.id){

        }else{
          newFormElements.push(element);
        } 
      }
      st = { ...state, formelements: newFormElements};
      break;
    }
    case 'CHANGE_ELEMENT_TYPE':{
      let newElement = getElementObject(action.element_type);
      let newFormElements = [];
      for(let i=0; i<st.formelements.length; i++){
        let element = st.formelements[i];
        if(element.id === action.id){
          newElement.id = element.id;
          newElement.name = element.name;
          newElement.position = element.position;
          newFormElements.push(newElement);
        }else{
          newFormElements.push(element);
        } 
      }
      st = { ...state, formelements: newFormElements, edit_element:newElement};
      break;
    }
    case 'EDIT_GRID_ROW':{
      let tempRows = [];
      st.rows.map((row, index) =>{
        tempRows.push(row);
      })
      let newFormElements = st.formelements;
      tempRows.map((row, index) =>{
        if(action.id === row.id){
          newFormElements.map((element,index1) => {
              element.value = row[element.name];
          })
        }
      })
      st = {...state, formelements:newFormElements};
      break;
    }
    case 'DELETE_GRID_ROW':{
      let tempRows = [];
      st.rows.map((row, index) =>{
        if(action.id !== row.id){
          tempRows.push(row);
        }
      })
      st = {...state, rows:tempRows};
      break; 
    }
    case 'ADD_ELEMENT': {
      console.log("Action ",action);
      let newElement = getElementObject(action.element_type);
      if(newElement){
        newElement.id = st.current_id+1;
        newElement.position = null;
        if(action.container !== null){
          newElement.isInnerElement = true;
        }
      }
      let newFormElements = [];
      st.formelements.map((element,index) => {
        if(action.container !== null && action.container === element.id){
          element.innerElements.push(st.current_id+1)
        }
        newFormElements.push(element);
      });
      newFormElements.push(newElement)
      st = { ...state, formelements: newFormElements, current_id:st.current_id+1};
      break;
    }
    case 'SET_EDIT_ELEMENT':{
      let editElement = {};
      for(let i=0; i<st.formelements.length; i++){
        let element = st.formelements[i];
        if(element.id === action.id){
          var newKeys = Object.keys(element);
          for(var j=0; j<newKeys.length; j++){
            editElement[newKeys[j]] = element[newKeys[j]];
          }
        } 
      }
      st = { ...state, edit_element: editElement};
      break;
    }
    case 'CANCEL_EDIT':{
      st = { ...state, edit_element: null};
      break;
    }
    case 'UPDATE_ELEMENT':{
      let newFormElements = [];
      for(let i=0; i<st.formelements.length; i++){
        let element = st.formelements[i];
        if(element.id === action.id){
          let newKeys = Object.keys(action.obj);
          console.log("Action object",action.obj);
          for(let j=0; j<newKeys.length; j++){
            element[newKeys[j]] = action.obj[newKeys[j]];
          }
        }
        newFormElements.push(element);
      }
      st = { ...state, formelements: newFormElements, edit_element: null};
      break; 
    }
    case 'DELETE_DROPDOWN_OPTION': {
      let newOptions = [];
      for(let i=0; i<st.edit_element.options.length;i++){
        if(action.index === i){
        }else{
          newOptions.push(st.edit_element.options[i]);
        }
      }
      st = {...state, edit_element:{...st.edit_element,options:newOptions}};
      break;
    }
    case 'DELETE_RADIO_OPTION': {
      let newValues = [];
      console.log(action.index);
      for(let i=0; i<st.edit_element.values.length;i++){
        if(action.index === i){
          console.log("skipping "+st.edit_element.values[i].label);
        }else{
          console.log("adding "+st.edit_element.values[i].label);
          newValues.push(st.edit_element.values[i]);
        }
      }
      st = {...state, edit_element:{...st.edit_element,values:newValues}};
      break;
    }
    case 'ADD_DROPDOWN_OPTION': {
      let temp_edit_element = st.edit_element;
      temp_edit_element.options.push({label:"", innervalue:""});
      st = { ...state, edit_element:temp_edit_element};
      break;
    }
    case 'RESET_FORM':{
      return getInitialState(); 
    }
    case 'ADD_RADIO_OPTION': {
      let temp_edit_element = st.edit_element;
      temp_edit_element.values.push({label:""});
      st = { ...state, edit_element:temp_edit_element};
      break;
    }
    case 'PROMPT_FORM_NAME': {
      st = {...state, save_form:true}
      break;
    }
    case 'CANCEL_SAVE':{
      st = {...state, save_form:false}
      break;
    }
    case 'EDIT_APPLICATION':{
      console.log("edit application",action)
      let newSt = getInitialState();
      let newColumns = {};
      action.datasource.fields.map((field, index) => {
        newColumns[field.display_text] = field.display_text;
      });
      newColumns.Actions = "Actions";
      newSt.fields = newColumns;
      newSt.datasource = action.datasource;
      newSt.rows = action.rows;
      newSt.form_name = action.application.name;
      newSt.form_id = action.application.id;
      newSt.formelements = action.application.elements;
      newSt.edit_application = action.application;
      return newSt;
    }
    default: {
      return st;
    }
  }
  console.log("After "+action.type, st);
  return st;
}