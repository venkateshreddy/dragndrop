const initialState = {
  applications: [],
  current_app_id:0,
  current_form:null,
  html_elements:[],
  datasources:[],
  current_data_source_id:0
};
export default function appReducer(state = initialState, action) {
	let st = state;
	switch(action.type){
		case 'SAVE_FORM':{
			console.log("saving form ", action.formObject);
			break;
		}
		case 'LOAD_HTML_FORM_ELEMENTS':{
			st = {...state, html_elements:action.data}
			break;
		}
		case 'DELETE_APPLICATION':{
			let applications = [];
	      	st.applications.map((app, index) =>{
	      		if(app.id !== action.id){
	      			applications.push(app);
	      		}
	      	})
	      	st = {...state, applications:applications}
			break;
		}
		case 'UPDATE_APPLICATION':{
			let applications = [];
	      	st.applications.map((app, index) =>{
	      		if(app.id !== action.id){
	      			applications.push(app);
	      		}else{
	      			let newApp = app;
	      			newApp.name = action.name;
	      			newApp.elements = action.elements;
	      			applications.push(newApp);
	      		}
	      	});
	      	st = {...state, applications:applications}
			break;	
		}
		case 'SAVE_APPLICATION':{
	      	let applications = [];
	      	st.applications.map((app, index) =>{
	      		applications.push(app);
	      	})
	      	applications.push(action.obj);
	      	st = {...state, applications:applications}
			break;
	    }
		case 'LOAD_SAVED_APPLICATIONS':{
			let applications = [];
			action.data.map((app, index) => {
				app.elements = JSON.parse(app.elements);
				applications.push(app);
			});
			st = {...state, applications:applications}
			break;	
		}
		case 'LOAD_SAVED_APPLICATIONS':{
			let savedApplications = [];
			let tempCount = st.current_form_id;
			Object.keys(action.data).forEach(function(app){
				let tempApp = {};
				tempCount ++;
				tempApp.name = app;
				tempApp.id = tempCount;
				tempApp.fields = [];
				action.data[app].forEach(function(column){
					let tempColumn = {display_text:column.COLUMN_NAME}
					tempApp.fields.push(tempColumn);
				})
				savedApplications.push(tempApp);
			});
			st = {...state, applications:savedApplications, current_form_id:tempCount}
			break;
		}
		case 'LOAD_DATA_SOURCES':{
			let dataSources = [];
			let tempCount = st.current_data_source_id;
			Object.keys(action.data).forEach(function(app){
				let tempSource = {};
				tempCount ++;
				tempSource.name = app;
				tempSource.id = tempCount;
				tempSource.fields = [];
				action.data[app].forEach(function(column){
					let tempColumn = {display_text:column.COLUMN_NAME}
					tempSource.fields.push(tempColumn);
				})
				dataSources.push(tempSource);
			});
			st = {...state, datasources:dataSources, current_form_id:tempCount}
			break;
		}
		default : {
			return st;
		}	
	}
	return st;
}