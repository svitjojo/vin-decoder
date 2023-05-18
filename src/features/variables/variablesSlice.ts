import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getVariablesList } from '../../api/fetchVehicles';
import { Variable } from '../../types/Variables';

interface State {
  items: Variable[],
  selectedItem: Variable | null,
  loaded: boolean,
  hasError: boolean
}

const initialState: State = {
  items: [],
  selectedItem: null, 
  loaded: false,
  hasError: false
};

export const getAllVariables = createAsyncThunk(
  'variables/getAll',
  async () => {
    try {
      const data = await getVariablesList();

      return data.Results;
    } catch (error) {
      if (error instanceof Error) {
        throw Error(error.message);
      }
    }
  },
);

const variablesSlice = createSlice({
  name: 'variables',
  initialState,
  reducers: {
    getVariableById: (state, action: PayloadAction<number>) => {
      state.selectedItem = state.items.find(item => item.ID === action.payload) || null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllVariables.pending, (state) => {
        state.loaded = false;
      })
      .addCase(getAllVariables.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(getAllVariables.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      })
  },
});

export const { getVariableById } = variablesSlice.actions;
export default variablesSlice.reducer;
