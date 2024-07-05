import reducer, { initialState } from './redux';
import {
  doNothing,
  setSelectedVariable,
  updateVariableFormula,
} from './redux.actions';

it('doing nothing, should return the initial state', () => {
  expect(reducer(undefined, doNothing())).toEqual(initialState);
});

describe('set selected variables', () => {
  it('updates selected variable, when matched', () => {
    const variableToSelect = initialState.variables[0].name;

    const result = {
      ...initialState,
      selectedVariableName: variableToSelect,
    };

    expect(reducer(undefined, setSelectedVariable(variableToSelect))).toEqual(
      result
    );
  });

  it('ignores selected variable, when no match', () => {
    expect(reducer(undefined, setSelectedVariable('b0gu5!'))).toEqual(
      initialState
    );
  });
});

describe('update variable formula', () => {
  it('changes formula, when variable exists', () => {
    const selectedVariable = initialState.variables[0].name;
    const newFormula = 'newFormula';

    const withSelectedVar = {
      ...initialState,
      selectedVariableName: selectedVariable,
    };
    const initialVariables = withSelectedVar.variables.map((i) => ({
      ...i,
    }));

    const expectedResult = {
      ...withSelectedVar,
      variables: withSelectedVar.variables.map((i, ind) =>
        ind === 0 ? { ...i, formula: newFormula } : { ...i }
      ),
    };

    const reducerResult = reducer(
      withSelectedVar,
      updateVariableFormula(selectedVariable, newFormula)
    );

    // reducer response
    expect(reducerResult).toEqual(expectedResult);

    // state immutability
    expect(initialState.variables).toEqual(initialVariables);
  });

  it("adds variable, if it doesn't exist", () => {
    const name = 'four';
    const formula = '4';

    const result = {
      ...initialState,
      variables: [...initialState.variables, { name: name, formula: formula }],
    };

    expect(reducer(undefined, updateVariableFormula(name, formula))).toEqual(
      result
    );
  });
});
