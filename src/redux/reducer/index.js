import { combineReducers } from 'redux';

import {
  ADD_TASK
} from "../actions/action-types";

const initialState = {
  tasks: [],
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;
