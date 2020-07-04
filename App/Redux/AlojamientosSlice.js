import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {keyBy} from 'lodash';

const FETCH_ALOJAMIENTOS = 'alojamientos/fetchAlojamientos';

export const fetchAlojamientos = createAsyncThunk(
  FETCH_ALOJAMIENTOS,
  async () => {
    const response = await axios.get('http://192.168.1.10:3000/alojamientos');
    return response.data;
  },
);

const alojamientosSlice = createSlice({
  name: 'alojamientos',
  initialState: {
    data: {},
    isFetching: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    // you can mutate state directly, since it is using immer behind the scenes
    [fetchAlojamientos.pending]: state => {
      state.data = [];
      state.isFetching = true;
      state.error = false;
    },
    [fetchAlojamientos.fulfilled]: (state, action) => {
      state.data = keyBy(action.payload, 'id');
      state.isFetching = false;
      state.error = false;
    },
    [fetchAlojamientos.rejected]: state => {
      state.data = [];
      state.isFetching = false;
      state.error = true;
    },
  },
});

const selectors = {
  getAll: state => Object.values(state.alojamientos.data), // Object.values(state.alojamientos.data),
  getOne: (state, id) => state.alojamientos.data[id],
  isError: state => state.alojamientos.error,
  isFetching: state => state.alojamientos.isFetching,
};

export const {success, failure, startFetching} = alojamientosSlice.actions;


// export const fetchAlojamientos = () => async dispatch => {
//   try {
//     dispatch(startFetching());
//     const response = await axios.get('http://192.168.1.10:3000/alojamientos');
//     dispatch(success(response.data));
//   } catch (err) {
//     dispatch(failure());
//   }
// };

export const {getAll, getOne, isError, isFetching} = selectors;
export default alojamientosSlice.reducer;

