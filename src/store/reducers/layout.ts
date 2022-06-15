import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BASE_SIDEBAR_PATH } from '@/utils/cgcConsts';

interface LayoutState {
  navigation: {
    path: string;
  };
  snackbar: {
    title: string;
    text: string;
    show: boolean;
    timeoutId: NodeJS.Timeout | null;
  };
}

const initialState: LayoutState = {
  navigation: {
    path: BASE_SIDEBAR_PATH,
  },
  snackbar: {
    title: 'Alert',
    text: '',
    show: false,
    timeoutId: null,
  },
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ text: string; title: string }>,
    ) => {
      if (state.snackbar.timeoutId) {
        clearTimeout(state.snackbar.timeoutId);
      }
      const tid = setTimeout(() => {
        clearTimeout(tid);
        state.snackbar = {
          title: '',
          text: '',
          show: false,
          timeoutId: null,
        };
      }, 2500);
      state.snackbar = {
        text: action.payload.text,
        title: action.payload.title,
        show: true,
        timeoutId: tid,
      };
    },
    closeSnackbar: (state) => {
      if (state.snackbar.timeoutId) {
        clearTimeout(state.snackbar.timeoutId);
      }
      state.snackbar = {
        title: '',
        text: '',
        show: false,
        timeoutId: null,
      };
    },
  },
});

export const { showSnackbar, closeSnackbar } = layoutSlice.actions;

export default layoutSlice.reducer;
