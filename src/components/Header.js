import React from 'react';
import logo from '../logo.svg';
import '../App.css';

class Header extends React.Component{
	render(){
		return(
			<header className="App-header">
			  <div className="head_logo"><img src={logo} className="App-logo" alt="logo" /><span>Dynamic Forms</span></div>
			  <h2>{ this.props.headtitle }</h2>
			</header>
		)
	}
}
export default Header
