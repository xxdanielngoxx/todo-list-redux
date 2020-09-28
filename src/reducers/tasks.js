import * as types from '../constants/ActionTypes';

const data = JSON.parse(localStorage.getItem("tasks"));

const initialState = data ? data : [];

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            if (action.task.id === "") {
                const newState = [...state, { id: generateId(), name: action.task.name, status: action.task.status }];
                localStorage.setItem("tasks", JSON.stringify(newState));
                return newState;   
            } else {
                const newState = state.map((task) => {
                    if (task.id === action.task.id) {
                        return {...task, ...action.task}
                    }
                    return task;
                });
                localStorage.setItem("tasks", JSON.stringify(newState));
                return newState;
            }
        case types.UPDATE_STATUS_TASK:
            const indexItemUpdatedStatus = findIndexById(state, action.id);
            if (indexItemUpdatedStatus !== -1) {
                const tasks = state.map((task, index) => {
                    if (indexItemUpdatedStatus !== index) {
                        return task;
                    }
                    return {
                        ...task,
                        status: !task.status,
                    }
                });
                localStorage.setItem("tasks", JSON.stringify(tasks));
                return tasks;
            }
            return state;
        case types.DELETE_TASK:
            const indexItemDeleted = findIndexById(state, action.id);
            state.splice(indexItemDeleted, 1);
            localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];
        default:
            return state;
    }
}

export default taskReducer;

const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

const generateId = () => {
    return s4() + s4() + "-" + s4() + "-" + s4() + s4() + "-"
        + s4() + "-" + s4() + "-" + s4() + s4() + s4();
}

const findIndexById = (tasks, id) => {
    let result = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) {
            result = index;
        }
    });
    return result;
}