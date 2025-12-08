import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfoState {
  data: Omit<UserInfo, "password">;
}

const initialState: UserInfoState = {
  data: {
    name: "",
    email: "",
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<UserInfo>) => {
      state.data = action.payload;
    },
    update: (
      state,
      action: PayloadAction<{
        key: keyof Omit<UserInfo, "password">;
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      state.data[key] = value;
    },
  },
});

export const { set, update } = userInfoSlice.actions;
export default userInfoSlice.reducer;
