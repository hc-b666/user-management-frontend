import { createContext, useReducer, useContext, FC, ReactNode } from "react";
import loadingReducer, {
  initialState,
  LoadingState,
  LoadingAction,
} from "@/reducers/loadingReducer";

interface LoadingContextProps {
  state: LoadingState;
  dispatch: React.Dispatch<LoadingAction>;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export const LoadingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  return (
    <LoadingContext.Provider value={{ state, dispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};
