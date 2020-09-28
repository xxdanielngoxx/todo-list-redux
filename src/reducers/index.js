import { combineReducers } from 'redux';
import filterTableReducer from './filterTable';
import isDisplayFormReducer from './isDisplayForm';
import searchReducer from './search';
import sortReducer from './sort';
import taskEditingReducer from './taskEditing';
import taskReducer from './tasks';

const myReducer = combineReducers({
    tasks: taskReducer,
    isDisplayForm: isDisplayFormReducer,
    taskEditing: taskEditingReducer,
    filterTable: filterTableReducer,
    searchKeyword: searchReducer,
    sort: sortReducer,
});

export default myReducer;