import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskItem from './TaskItem';
import * as actions from '../actions';

class TaskList extends Component {

  constructor(props) {
    super();
  }

  onChange = (event) => {
    this.props.onFilterTable(
      {
        name: event.target.name === "name" ? event.target.value : this.props.filterTable.name,
        status: event.target.name === "status" ? Number(event.target.value) : Number(this.state.filter.status),
      }
    );
  }


  doFilter = (tasks = []) => {
    return tasks.filter((task) => {
      return (this.props.filterTable.name === "") ? true : task.name.toLowerCase().indexOf(this.props.filterTable.name) !== -1;
    }).filter((task) => {
      if (this.props.filterTable.status === -1) return true;
      return task.status === (this.props.filterTable.status === 1);
    }).filter((task) => {
      return (this.props.searchKeyword === "") ? true : task.name.toLowerCase().indexOf(this.props.searchKeyword.toLowerCase()) !== -1;
    }).sort(
      (taskA, taskB) => {
        if (this.props.sort.by === "name") {
          if (taskA.name > taskB.name) return this.props.sort.value;
          else if (taskA.name < taskB.name) return -this.props.sort.value;
          else return 0;
        } else if (this.props.sort.by === "status") {
          if (taskA.status > taskB.status) return -this.props.sort.value;
          else if (taskA.status < taskB.status) return this.props.sort.value;
          else return 0;
        }
        return 0;
      }
    );
  }

  render() {

    const { tasks } = this.props;
    const { name, status } = this.props.filterTable;

    const filterTasks = this.doFilter(tasks);

    const elmTask = filterTasks.map((task, index) => {
      return <TaskItem
        key={task.id}
        task={task}
        index={index + 1}
      />
    });

    return (
      <div className="col-12 col-xs-12">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Name</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={this.onChange}
                />
              </td>
              <td>
                <select
                  name="status"
                  className="form-control"
                  value={status}
                  onChange={this.onChange}
                >
                  <option value={-1}>All</option>
                  <option value={1}>Active</option>
                  <option value={0}>Hide</option>
                </select>
              </td>
              <td></td>
            </tr>
            {elmTask}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    filterTable: state.filterTable,
    searchKeyword: state.searchKeyword,
    sort: state.sort,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: (filter) => {
      dispatch(actions.filterTable(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);