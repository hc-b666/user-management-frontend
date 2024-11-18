export interface LoadingState {
  isLoading: boolean;
}

export const initialState: LoadingState = {
  isLoading: false,
};

export type LoadingAction = { type: "START_LOADING" } | { type: "STOP_LOADING" };

const loadingReducer = (
  state: LoadingState = initialState,
  action: LoadingAction
): LoadingState => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "STOP_LOADING":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default loadingReducer;
