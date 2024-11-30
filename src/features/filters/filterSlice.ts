import {createSlice} from '@reduxjs/toolkit';
import {ModelFilter, TypeFilter} from "../../const/enum";

interface FilterState {
  type: TypeFilter;
  model: ModelFilter;
}

const initialState: FilterState = {
  type: TypeFilter.ALL,
  model: ModelFilter.ALL,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setTypeFilter(state, action) {
      state.type = action.payload;
    },
    setModelFilter(state, action) {
      state.model = action.payload;
    },
  },
});

export const {setTypeFilter, setModelFilter} = filterSlice.actions;
export default filterSlice.reducer;
