import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@shared-types/user";

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    id: "",
    name: "",
    email: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (
      state,
      action: PayloadAction<{
        key: keyof User;
        value: string;
      }>,
    ) => {
      const { key, value } = action.payload;
      state.user[key] = value;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
