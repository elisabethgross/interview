import {
  Variable,
  Action,
  SET_SELECTED_VARIABLE,
  UPSERT_VARIABLE_FORMULA,
  DO_NOTHING,
  updateVariableFormula,
} from './redux.actions';

export interface ReduxState {
  selectedVariableName: string | undefined;
  variables: Variable[];
}

export const initialState = {
  selectedVariableName: undefined,
  variables: [
    { name: 'One', formula: '1' },
    { name: 'Two', formula: '2' },
    { name: 'Three', formula: '3' },
  ],
};

const reducer = (
  state: ReduxState = initialState,
  action: Action
): ReduxState => {
  switch (action.type) {
    case SET_SELECTED_VARIABLE:
      // TODO: set selectedVariableName if name found in variables list
      return state;
    case UPSERT_VARIABLE_FORMULA:
      // TODO: update formula if variable exists,
      // otherwise add the new variable
      return state;
    case DO_NOTHING:
    default:
      return state;
  }
};

export default reducer;
