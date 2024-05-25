import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userType: "",
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserLocalStorage: (state, action) => {
      const { userId, userType } = action.payload;
      localStorage.setItem("userId", userId);
      localStorage.setItem("userType", userType);
      state.userId = userId;
      state.userType = userType;
    },
    deleteUserLocalStorage: (state) => {
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
      state.userId = null;
      state.userType = "";
    },
    updateUserLocalStorage: (state, action) => {
      const { userId, userType } = action.payload;
      if (userId) {
        localStorage.setItem("userId", userId);
        state.userId = userId;
      }
      if (userType) {
        localStorage.setItem("userType", userType);
        state.userType = userType;
      }
    },
    updateUserProfileToLocalStorage: (state, action) => {
      const profilePicture = action.payload;
      const userType = JSON.parse(localStorage.getItem("userType"));
      const updatedData = { userType, profilePicture };
      localStorage.setItem("userType", JSON.stringify(updatedData));
      state.userType = updatedData;
    },
  },
});

export const {
  setUserLocalStorage,
  deleteUserLocalStorage,
  updateUserLocalStorage,
  updateUserProfileToLocalStorage,
} = userSlice.actions;
export default userSlice.reducer;
