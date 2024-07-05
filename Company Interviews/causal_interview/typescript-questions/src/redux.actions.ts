export interface Variable {
  /** This can be considered a unique ID */
  name: string;
  /**
   * The formula for a variable. To reference another variable, uses the syntax:
   * `{{variable name}}`
   */
  formula: string;
}

export const SET_SELECTED_VARIABLE = 'set-selected-variable';
export interface SetSelectedVariableAction {
  type: typeof SET_SELECTED_VARIABLE;
  variableName: string;
}
export function setSelectedVariable(
  variableName: string
): SetSelectedVariableAction {
  return {
    type: SET_SELECTED_VARIABLE,
    variableName,
  };
}

export const UPSERT_VARIABLE_FORMULA = 'upsert-variable-formula';
export interface UpdateVariableFormulaAction {
  type: typeof UPSERT_VARIABLE_FORMULA;
  variableName: string;
  newFormula: string;
}
export function updateVariableFormula(
  variableName: string,
  newFormula: string
): UpdateVariableFormulaAction {
  return {
    type: UPSERT_VARIABLE_FORMULA,
    variableName,
    newFormula,
  };
}

export const DO_NOTHING = 'do-nothing';
export interface DoNothingAction {
  type: typeof DO_NOTHING;
}
export function doNothing(): DoNothingAction {
  return { type: DO_NOTHING };
}

export type Action =
  | SetSelectedVariableAction
  | UpdateVariableFormulaAction
  | DoNothingAction;
