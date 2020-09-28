import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as actions from '../actions';

class TaskItem extends Component {
    
    constructor(props) {
        super();
    }

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }

    onEditTask = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }

    render() {

        const { index, task } = this.props;

        return (
            <tr>
                <td className="text-center">{index}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span 
                        onClick={this.onUpdateStatus}
                        className={task.status === true ? "badge badge-success" : "badge badge-danger"}>
                        {task.status === true ? "Active" : "Hide"}
                    </span>
                </td>
                <td className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-warning mr-2"
                        onClick={this.onEditTask}
                    >
                        <FontAwesomeIcon icon={faPencilAlt} /> Edit
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.onDelete}
                    >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        taskEditing: state.taskEditing,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatusTask(id));
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);


