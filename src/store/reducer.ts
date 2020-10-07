export interface Action {
  type: ActionType;
}

export enum ActionType {}

export interface State {
  taxRate: number;
}

export const initialState: State = {
  taxRate: 0.07
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
  }
  return state;
};

export default reducer;
