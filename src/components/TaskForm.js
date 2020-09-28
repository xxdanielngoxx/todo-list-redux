import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as actions from '../actions';

class TaskForm extends Component {

  constructor(props) {
    super();
    this.state = {
      id: "",
      name: "",
      status: false,
    }
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.task.id !== state.id) {
      return {
        id: props.task.id,
        name: props.task.name,
        status: props.task.status,
      }
    }
    return {};
  }

  onChange = (event) => {

    const value = event.target.name === "status" ? (event.target.value === "true" ? true : false ) 
    : event.target.value;

    this.setState({
      [event.target.name]: value,
    });

  }

  onSubmit = (event) => {
    event.preventDefault();

    this.props.onAddTask(this.state);

    this.props.onClearTaskEditing();
    this.onExitForm();
  }

  onExitForm = () => {
    this.props.onCloseForm();
    this.props.onClearTaskEditing();
  }

  onClear = () => {
   this.setState({
     name: "",
     status: false,
   })
  }

  render() {

    if (!this.props.isDisplayForm) return '';

    return (
      <div className="col-xs-4 p-3">
        <div className="card border border-warning">
          <div className="card-header bg-warning">
            <div className="row">
              <div className="col-10">
                <h5>{ this.state.id !== "" ? "Update Task" : "Add Task" }</h5>
              </div>
              <div className="col-2 text-end">
                <span>
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    onClick={ this.onExitForm }
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Name</label>
                <div className="col-sm-12">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Status</label>
                <div className="col-sm-12">
                  <select 
                    className="form-control"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Hide</option>
                  </select>
                </div>
              </div>
              <div className="form-group row justify-content-center">
                <div className="col-xs-12">
                  <button 
                    type="submit" 
                    className="btn btn-success mr-2"
                  >
                    <FontAwesomeIcon icon={faPlus} /> { this.state.id === ""  ? "ADD" : "Save"}
                      </button>
                  <button
                    type="button" 
                    className="btn btn-danger"
                    onClick={this.onClear}
                  >
                    <FontAwesomeIcon icon={faTimes} /> Delete
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    task: state.taskEditing,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddTask: (task) => {
      dispatch(actions.addTask(task));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    },
    onClearTaskEditing: () => {
      dispatch(actions.editTask({id: "", name: "", status: false}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
