import React, {useReducer} from 'react';

const INITIAL = 'INITIAL';
const ADD = 'ADD';
const ADD_REVIEWER = 'ADD_REVIEWER';
const REMOVE_REVIEWER = 'REMOVE_REVIEWER';

export const fetchInitial = data => ({
  type: INITIAL,
  data,
});

export const addData = data => {
  if (!data) {
    return;
  }

  return {
    type: ADD,
    data,
  };
};

export const addReviewerToState = data => {
  if (!data) {
    return;
  }

  return {
    type: ADD_REVIEWER,
    data,
  };
};

export const removeReviewerFromState = data => {
  if (!data) {
    return;
  }

  return {
    type: REMOVE_REVIEWER,
    data,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case INITIAL:
      return [...action.data];
    case ADD:
      return [action.data, ...state];
    case ADD_REVIEWER: {
      const reviewee = state.find(e => e.id === action.data.reviewee);
      const reviewer = state.find(e => e.id === action.data.reviewer);
      reviewee.reviewers = [
        ...reviewee.reviewers,
        {id: reviewer.id, name: reviewer.name},
      ];
      return [...state];
    }
    case REMOVE_REVIEWER: {
      const reviewee = state.find(e => e.id === action.data.reviewee);
      const reviewer = state.find(e => e.id === action.data.reviewer);
      reviewee.reviewers = reviewee.reviewers.filter(e => e.id !== reviewer.id);
      return [...state];
    }
    default:
      return state;
  }
};

const SharedDataContext = React.createContext({state: []});

export const DataProvider = props => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <SharedDataContext.Provider value={{state, dispatch}}>
      {props.children}
    </SharedDataContext.Provider>
  );
};

export default SharedDataContext;