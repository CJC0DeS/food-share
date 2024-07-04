import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    resetUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
