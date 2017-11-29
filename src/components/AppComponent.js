import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import Header from './Header';
import FormBuilder from '../containers/FormBuilder';		

class AppComponent extends React.Component{ 
  render(){
    return(
      <div className="App">
        <Header headtitle = "dynamic form builder" />
        <FormBuilder />
      </div>
    )
  }
}
export default connect()(AppComponent);