import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface UserState {
  userInfo: {
    expired_at: number;
    id: number | string;
    access_token: string;
    token_type: string;
    refresh_token: string;
  };
}

const initialState: UserState = {
  userInfo: {
    refresh_token: '',
    expired_at: 0,
    id: 0,
    access_token: '',
    token_type: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUserInfo: (state) => {
      const _auth = window.localStorage.getItem('auth');
      if (_auth) {
        state.userInfo = JSON.parse(_auth);
      }
    },
    setUserInfo: (state, action: PayloadAction<any>) => {
      localStorage.setItem('info', JSON.stringify(action.payload));
      state.userInfo = action.payload;
    },
  },
});

export const { initUserInfo, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
