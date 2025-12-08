import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Example {
  id: string;
}

export interface ExampleState {
  list: Example[];
}

const initialState: ExampleState = {
  list: [],
};

export const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Example[]>) => {
      state.list = action.payload;
    },
    add: (state, action: PayloadAction<Example>) => {
      state.list.push(action.payload);
    },
    update: (state, action: PayloadAction<Example>) => {
      state.list = state.list.map((source) =>
        source.id === action.payload.id ? action.payload : source
      );
    },
    remove: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((source) => source.id !== action.payload);
    },
  },
});

export const { set, add, update, remove } = exampleSlice.actions;
export default exampleSlice.reducer;
