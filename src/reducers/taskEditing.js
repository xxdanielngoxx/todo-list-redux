import * as types from '../constants/ActionTypes';


const initialState = {id: "", name: "", status: false};

const taskEditingReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.EDIT_TASK:
            return action.taskEditing;
        default:
            return state;
    };
};

export default taskEditingReducer;