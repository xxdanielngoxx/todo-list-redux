import './App.css';

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import { Header } from './components/Header';
import { connect } from 'react-redux';
import * as actions from './actions';

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      sort: {
        by: "name",
        value: 1,
      }
    }
  }

  onToggleForm = () => {
    if (this.props.isDisplayForm) {
      if (this.props.taskEditing.id !== "") {
        this.props.onClearTaskEditing();
      } else {
        this.props.onToggleForm();
      }
    } else {
      this.props.onClearTaskEditing();
      this.props.onToggleForm();
    }
  }

  render() {

    const { isDisplayForm } = this.props;

    return (
      <div className="container">
        <Header/>
        <div className="row">
          <TaskForm/>
          <div className={isDisplayForm ? "col-8 col-xs-8 p-3" : "col-12 col-xs-12 p-3"}>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              <FontAwesomeIcon icon={faPlus}/> Add Task
            </button>
            <TaskControl/>
            <div className="row mt-2">
              <TaskList/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    taskEditing: state.taskEditing,
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onClearTaskEditing: () => {
      dispatch(actions.editTask({id: "", name: "", status: false}))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);