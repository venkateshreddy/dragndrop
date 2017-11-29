import React from 'react';
import ResponsiveTable from './ResponsiveTable';
import { connect } from 'react-redux';

class Grid extends React.Component{
	render(){
		return(
			    <ResponsiveTable columns={this.props.cols} rows={this.props.rows} />
		);
	}
}
function mapStateToProps(state){
	return {
		cols: state.formReducer.fields,
		rows: state.formReducer.rows
	}
}


export default connect(mapStateToProps)(Grid);