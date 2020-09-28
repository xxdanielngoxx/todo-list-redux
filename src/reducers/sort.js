import * as types from '../constants/ActionTypes';

const initialState = {by: "name", value: 1}

const sortReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SORT:
            return action.sort;
        default:
            return state;
    }
}

export default sortReducer;