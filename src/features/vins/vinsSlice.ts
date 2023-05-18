import { loadDecodedVin } from '../../api/fetchVehicles';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ResponseFromServer } from '../../types/ResponseFromServer';
import { convertResponseKeysToLowerCase } from '../../helpers/convertKeysToLowerCase';
import { VinInfo } from '../../types/Vin';

export interface VinsState { 
  decodedVin: ResponseFromServer<VinInfo> | null,
  lastDecodedVins: string[],
  lastSearched: ResponseFromServer<VinInfo>[],
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
      const decodedData = await loadDecodedVin(vin);
      const normalizedDecodedData = convertResponseKeysToLowerCase<VinInfo>(decodedData);

      return normalizedDecodedData;
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

      const vinFromLastSearched = state.lastSearched.filter(vin => vin.searchCriteria.includes(action.payload));

      if (vinFromLastSearched.length === 0 && state.decodedVin) {

        state.lastSearched.unshift(state.decodedVin);
      }

      if (state.lastSearched.length > 3) {
        state.lastSearched.splice(3);
      }
    },
    setDecodedVin: (state, action: PayloadAction<string>) => {
      const decodedVinFromLastSearched = state.lastSearched.find(vin => vin.searchCriteria.includes(action.payload));

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

        if (action.payload) {
          state.decodedVin = action.payload;
        }
      })
      .addCase(getDecodedVin.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      })
  },
});

export const { addVinToLastDecoded, setDecodedVin } = vinsSlice.actions;

export default vinsSlice.reducer;
