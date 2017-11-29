import React from 'react';
import _ from 'lodash';
import EditIcon from '../images/edit.png';
import DeleteIcon from '../images/delete.png';
import { connect } from 'react-redux'
import { editRow,deleteRow } from '../actions'
class ResponsiveTable extends React.Component{
  _head(){
    var columns = _.map(this.props.columns, function(colName, index) {
      return (
        <th key={index}>{colName}</th>
      );
    });
    return (
      <tr>{columns}</tr>
    );
  }
  
  _rows(){
    var _this = this;
    return _.map(_this.props.rows, function(row, index) {
      var values = _.map(_this.props.columns, function(colName, colKey) {
        if(colName === "Actions"){
          return(
            <td key={colKey} data-label="Actions">
              <div className="actions_div">
                <img src={EditIcon} className="action_icon" alt="edit" onClick={() => _this.props.dispatch(editRow(row.id))} />
                <img src={DeleteIcon} className="action_icon" alt="delete" onClick={() => _this.deleteRow(row.id)} />
              </div>
            </td>
          )
        }else{
          return (
            <td key={colKey} data-label={colName}>{row[colKey]}</td>
          );
        }
      })
      return (
        <tr key={index}>{values}</tr>
      );
    })
  }
  deleteRow(id){
    //eslint-disable-next-line
    let x = confirm("Are you sure you want to delete this row?");
    if(x){
      this.props.dispatch(deleteRow(id, this.props.formReducer.datasource.name));
    }
  }
  render() {
    return (
      <table className="responsive-table">
        <thead>
          {this._head()}
        </thead>
        <tbody>
          {this._rows()}
        </tbody>
      </table>
    );
  }
}
function mapStateToProps(state){
  return {
    formReducer: state.formReducer
  }
}
export default connect(mapStateToProps)(ResponsiveTable);