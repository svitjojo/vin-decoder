import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import variablesSlice from "../features/variables/variablesSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import vinsSlice from "../features/vins/vinsSlice";

export const store = configureStore({
  reducer: {
    variables: variablesSlice,
    vins: vinsSlice,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
  >;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
