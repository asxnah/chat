import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfoState {
  // Состояние с данными пользователя без пароля
  data: Omit<UserInfo, "password">;
}

const initialState: UserInfoState = {
  // Инициализация пустыми значениями
  data: {
    name: "",
    email: "",
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    // Устанавливает полностью объект UserInfo (кроме пароля)
    set: (state, action: PayloadAction<UserInfo>) => {
      state.data = action.payload;
    },

    // Обновляет конкретное поле в объекте data
    update: (
      state,
      action: PayloadAction<{
        key: keyof Omit<UserInfo, "password">;
        value: string;
      }>,
    ) => {
      const { key, value } = action.payload;
      state.data[key] = value;
    },
  },
});

// Экспортируем actions set и update
export const { set, update } = userInfoSlice.actions;
// Экспортируем редьюсер по умолчанию
export default userInfoSlice.reducer;
