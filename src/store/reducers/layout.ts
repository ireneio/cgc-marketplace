import {
  BASE_SIDEBAR_PATH,
  SIDEBAR_PATH_STORAGE_KEY,
} from '@/components/Layout/DefaultLayout';
import store from '..';

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

type Action =
  | {
      type: 'SET_NAVIGATION_PATH';
      payload: string;
    }
  | {
      type: 'SHOW_SNACKBAR';
      payload: { title: string; text: string };
    }
  | {
      type: 'CLOSE_SNACKBAR';
    };

export default function layoutReducer(
  state: LayoutState = initialState,
  action: Action,
) {
  switch (action.type) {
    case 'SET_NAVIGATION_PATH':
      window.localStorage.setItem(
        SIDEBAR_PATH_STORAGE_KEY,
        JSON.stringify(action.payload),
      );
      return {
        ...state,
        navigation: {
          path: action.payload,
        },
      };
    case 'SHOW_SNACKBAR':
      if (state.snackbar.timeoutId) {
        clearTimeout(state.snackbar.timeoutId);
      }
      const tid = setTimeout(() => {
        clearTimeout(tid);
        store.dispatch({ type: 'CLOSE_SNACKBAR' });
      }, 2500);

      return {
        ...state,
        snackbar: {
          text: action.payload.text,
          title: action.payload.title,
          show: true,
          timeoutId: tid,
        },
      };
    case 'CLOSE_SNACKBAR':
      if (state.snackbar.timeoutId) {
        clearTimeout(state.snackbar.timeoutId);
      }
      return {
        ...state,
        snackbar: {
          title: '',
          text: '',
          show: false,
          timeoutId: null,
        },
      };
    default:
      return state;
  }
}
