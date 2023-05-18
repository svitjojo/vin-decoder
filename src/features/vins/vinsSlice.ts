import { getDecodedVin as getDecoded } from '../../api/fetchVehicles';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VinResponse } from '../../types/Vin';

export interface VinsState { 
  decodedVin: VinResponse | null,
  lastDecodedVins: string[],
  lastSearched: VinResponse[],
  loaded: boolean,
  hasError: boolean
};

const initialState: VinsState = {
  decodedVin: null,
  lastDecodedVins: [],
  lastSearched: [],
  loaded: false,
  hasError: false
};

export const getDecodedVin = createAsyncThunk(
  'decodedVins/get',
  async (vin: string) => {
    try {
      const decodedVin = await getDecoded(vin);

      return decodedVin;
    } catch (error) {
      if (error instanceof Error) {
        throw Error(error.message);
      }
    }
});

const vinsSlice = createSlice({
  name: 'vins',
  initialState,
  reducers: {
    addVinToLastDecoded: (state, action: PayloadAction<string>) => {
      const isInLastDecoded = state.lastDecodedVins.some(vin => vin === action.payload);

      if (!isInLastDecoded) {
        state.lastDecodedVins.unshift(action.payload);
      }

      if (state.lastDecodedVins.length > 5) {
        state.lastDecodedVins.splice(5);
      }

      const vinFromLastSearched = state.lastSearched.filter(vin => vin.SearchCriteria.includes(action.payload));

      if (vinFromLastSearched.length === 0 && state.decodedVin) {

        state.lastSearched.unshift(state.decodedVin);
      }

      if (state.lastSearched.length > 3) {
        state.lastSearched.splice(3);
      }
    },
    setDecodedVin: (state, action: PayloadAction<string>) => {
      const decodedVinFromLastSearched = state.lastSearched.find(vin => vin.SearchCriteria.includes(action.payload));

      if (decodedVinFromLastSearched) {
        state.decodedVin = decodedVinFromLastSearched;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getDecodedVin.pending, (state) => {
        state.loaded = false;
      })
      .addCase(getDecodedVin.fulfilled, (state, action) => {
        state.loaded = true;
        state.decodedVin = action.payload;
      })
      .addCase(getDecodedVin.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      })
  },
});

export const { addVinToLastDecoded, setDecodedVin } = vinsSlice.actions;

export default vinsSlice.reducer;
