import { REQUEST_HEROLIST } from './Type';

let defaultState = {
  type: '',
};

export default (state = defaultState, action) => {
  console.log('redux action =' + action.type);

  if (action.type === REQUEST_HEROLIST) {
    // let newState=JSON.parse(JSON.stringify(state));
    // newState.inputVal=action.value;
    return {
      ...state,
      type: action.type,
      heroList: action.value,
    };
  }
  return state;
};
