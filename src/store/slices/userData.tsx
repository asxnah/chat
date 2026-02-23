import { User } from "@/shared/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDataState {
  // Состояние с данными пользователя без пароля
  data: Omit<User, "password">;
}

const initialState: UserDataState = {
  // Инициализация пустыми значениями
  data: {
    name: "",
    email: "",
  },
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    // Устанавливает полностью объект User (кроме пароля)
    set: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },

    // Обновляет конкретное поле в объекте data
    update: (
      state,
      action: PayloadAction<{
        key: keyof Omit<User, "password">;
        value: string;
      }>,
    ) => {
      const { key, value } = action.payload;
      state.data[key] = value;
    },
  },
});

// Экспортируем actions set и update
export const { set, update } = userDataSlice.actions;
// Экспортируем редьюсер по умолчанию
export default userDataSlice.reducer;
